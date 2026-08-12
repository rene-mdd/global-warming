"use client";

// components/LocationsPanel.jsx
//
// "IPs by location" — expandable country rows revealing the individual IPs seen
// from each place, with request counts, error counts, first/last seen, top
// route and browser.
//
// Two deliberate choices:
//
//  - Not a world map. Under any anonymisation mode precise lat/long is dropped
//    (street-level coordinates identify a household; the city name doesn't), so
//    a map would be plotting city centroids and implying accuracy that isn't
//    there. A grouped list is honest and needs no map dependency.
//  - Each country is marked with how its geo was derived. `~` means it was
//    inferred from the Vercel edge region, not the visitor's IP, so treat it as
//    "roughly this part of the world" rather than a fact.

import { useCallback, useEffect, useMemo, useState } from "react";
import PropTypes from "prop-types";
import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import CircularProgress from "@mui/material/CircularProgress";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TextField from "@mui/material/TextField";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

import styles from "./locationsPanel.module.scss";
import {
  MAGNITUDE_HUE,
  formatFullTimestamp,
  formatNumber,
  formatPercent,
} from "../../../lib/chart-theme";
import { countryFlag, countryName } from "../../../lib/vercel-regions";

/** Verb describing what the stored IP value actually is, for the subtitle. */
function ipModeWord(mode) {
  if (mode === "hash") return "hashed";
  if (mode === "truncate") return "truncated to /24";
  return "not stored";
}

/** Column heading for the address column, matching the anonymisation mode. */
function addressHeading(mode) {
  if (mode === "hash") return "Visitor (hashed)";
  if (mode === "truncate") return "Subnet";
  return "IP address";
}

/** Unit label for the per-country count, matching what it really counts. */
function countUnit(mode) {
  if (mode === "truncate") return "subnets";
  if (mode === "hash") return "visitors";
  return "IPs";
}

/** Explains how a country's location was derived. */
function geoQualityTitle(quality) {
  if (quality === "approximate") {
    return "Inferred from the Vercel edge region, not the visitor's IP — treat as approximate";
  }
  return "Some of these requests had true geolocation, some were inferred from the edge region";
}

function relativeTime(ms) {
  const delta = Date.now() - Number(ms);
  if (!Number.isFinite(delta)) return "—";
  const mins = Math.round(delta / 60000);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins}m ago`;
  const hours = Math.round(mins / 60);
  if (hours < 24) return `${hours}h ago`;
  return `${Math.round(hours / 24)}d ago`;
}

export default function LocationsPanel({ hours, nonce, isDark, hue }) {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState(() => new Set());
  const [filter, setFilter] = useState("");

  const magnitudeHue =
    hue ?? (isDark ? MAGNITUDE_HUE.dark : MAGNITUDE_HUE.light);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    fetch(`/api/drains/locations?hours=${hours}`, { cache: "no-store" })
      .then(async (res) => {
        const json = await res.json().catch(() => ({}));
        if (!res.ok)
          throw new Error(json?.error || `Request failed (${res.status})`);
        return json;
      })
      .then((json) => {
        if (cancelled) return;
        setData(json);
        setError(null);
      })
      .catch((err) => {
        if (!cancelled) setError(err.message);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [hours, nonce]);

  const toggle = useCallback((code) => {
    setExpanded((prev) => {
      const next = new Set(prev);
      if (next.has(code)) next.delete(code);
      else next.add(code);
      return next;
    });
  }, []);

  const countries = useMemo(() => {
    const all = data?.countries ?? [];
    const q = filter.trim().toLowerCase();
    if (!q) return all;
    return all.filter((c) => {
      if (countryName(c.country).toLowerCase().includes(q)) return true;
      if (c.country.toLowerCase().includes(q)) return true;
      if (c.cities.some((city) => city.city?.toLowerCase().includes(q)))
        return true;
      return c.ips.some((ip) => ip.ip.toLowerCase().includes(q));
    });
  }, [data, filter]);

  const maxRequests = useMemo(
    () => Math.max(1, ...(data?.countries ?? []).map((c) => c.requests)),
    [data],
  );

  const ipsHidden = data?.privacy?.mode === "drop";
  // Separate flags rather than a chained ternary in JSX (no-nested-ternary).
  const isLoading = loading && !data;
  const isEmpty = !isLoading && countries.length === 0;
  const showList = !isLoading && countries.length > 0;

  return (
    <div className={styles.panel}>
      <div className={styles.head}>
        <div>
          <h3 className={styles.title}>IPs by location</h3>
          <p className={styles.sub}>
            Click a country to see the individual addresses
            {data?.privacy?.mode && data.privacy.mode !== "off"
              ? ` · IPs are ${ipModeWord(data.privacy.mode)}`
              : ""}
          </p>
        </div>
        <TextField
          size="small"
          placeholder="Filter country, city or IP…"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          sx={{ minWidth: 220 }}
        />
      </div>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      {ipsHidden && (
        <Alert severity="info" sx={{ mb: 2 }}>
          <code>DRAIN_ANONYMIZE_IPS=drop</code> is set, so no addresses are
          stored — locations and counts only.
        </Alert>
      )}

      {isLoading && (
        <Stack alignItems="center" sx={{ py: 4 }}>
          <CircularProgress size={24} />
        </Stack>
      )}
      {isEmpty && (
        <Typography variant="body2" color="text.secondary" sx={{ py: 3 }}>
          {filter
            ? "Nothing matches that filter."
            : "No location data in this window yet."}
        </Typography>
      )}
      {showList && (
        <ul className={styles.countryList}>
          {countries.map((country) => {
            const isOpen = expanded.has(country.country);
            const errorRate = country.requests
              ? country.errors / country.requests
              : 0;

            return (
              <li key={country.country} className={styles.country}>
                <button
                  type="button"
                  className={styles.countryRow}
                  onClick={() => toggle(country.country)}
                  aria-expanded={isOpen}
                >
                  <IconButton
                    size="small"
                    component="span"
                    tabIndex={-1}
                    sx={{ p: 0.25 }}
                  >
                    {isOpen ? (
                      <ExpandMoreIcon fontSize="small" />
                    ) : (
                      <ChevronRightIcon fontSize="small" />
                    )}
                  </IconButton>

                  <span className={styles.flag}>
                    {countryFlag(country.country)}
                  </span>

                  <span className={styles.countryName}>
                    {countryName(country.country)}
                    {country.geoQuality !== "accurate" && (
                      <Tooltip title={geoQualityTitle(country.geoQuality)}>
                        <span className={styles.approx}>~</span>
                      </Tooltip>
                    )}
                  </span>

                  <span className={styles.countryStats}>
                    <span className={styles.statNum}>
                      {formatNumber(country.requests)}
                    </span>
                    <span className={styles.statLabel}>req</span>
                    {!ipsHidden && (
                      <>
                        <span className={styles.statNum}>
                          {formatNumber(country.uniqueIps)}
                        </span>
                        {/* Match the label to what the number actually counts. */}
                        <span className={styles.statLabel}>
                          {countUnit(data?.privacy?.mode)}
                        </span>
                      </>
                    )}
                    {country.errors > 0 && (
                      <Tooltip
                        title={`${formatNumber(country.errors)} responses were 4xx or 5xx`}
                      >
                        <span className={styles.errBadge}>
                          {formatPercent(errorRate, 0)} err
                        </span>
                      </Tooltip>
                    )}
                  </span>

                  <span className={styles.track}>
                    <span
                      className={styles.fill}
                      style={{
                        width: `${Math.max(2, (country.requests / maxRequests) * 100)}%`,
                        background: magnitudeHue,
                      }}
                    />
                  </span>
                </button>

                <Collapse in={isOpen} unmountOnExit>
                  <div className={styles.detail}>
                    {country.cities.length > 0 && (
                      <div className={styles.cityRow}>
                        {country.cities.slice(0, 12).map((city) => (
                          <Chip
                            key={city.city}
                            size="small"
                            variant="outlined"
                            label={`${city.city} · ${formatNumber(city.requests)}`}
                            onClick={() => setFilter(city.city)}
                          />
                        ))}
                      </div>
                    )}

                    {ipsHidden || country.ips.length === 0 ? (
                      <Typography variant="caption" color="text.secondary">
                        {ipsHidden
                          ? "IP storage is disabled."
                          : "No addresses recorded."}
                      </Typography>
                    ) : (
                      <Box className={styles.tableWrap}>
                        <Table size="small">
                          <TableHead>
                            <TableRow>
                              <TableCell>
                                {addressHeading(data?.privacy?.mode)}
                              </TableCell>
                              <TableCell>City</TableCell>
                              <TableCell align="right">Requests</TableCell>
                              <TableCell align="right">Errors</TableCell>
                              <TableCell>Top route</TableCell>
                              <TableCell>Client</TableCell>
                              <TableCell>First seen</TableCell>
                              <TableCell>Last seen</TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {country.ips.map((ip) => (
                              <TableRow key={ip.ip} hover>
                                <TableCell className={styles.mono}>
                                  {ip.ip}
                                  {ip.isBot && (
                                    <Chip
                                      size="small"
                                      label="bot"
                                      variant="outlined"
                                      sx={{
                                        ml: 0.75,
                                        height: 18,
                                        fontSize: 10,
                                      }}
                                    />
                                  )}
                                </TableCell>
                                <TableCell>{ip.city ?? "—"}</TableCell>
                                <TableCell align="right">
                                  {formatNumber(ip.requests)}
                                </TableCell>
                                <TableCell align="right">
                                  {ip.errors ? formatNumber(ip.errors) : "—"}
                                </TableCell>
                                <TableCell className={styles.mono}>
                                  <span className={styles.truncate}>
                                    {ip.topRoute ?? "—"}
                                  </span>
                                </TableCell>
                                <TableCell>
                                  {ip.browser ?? "—"}
                                  {ip.os && ip.os !== "Unknown"
                                    ? ` / ${ip.os}`
                                    : ""}
                                </TableCell>
                                <TableCell>
                                  <Tooltip
                                    title={formatFullTimestamp(ip.firstSeen)}
                                  >
                                    <span>{relativeTime(ip.firstSeen)}</span>
                                  </Tooltip>
                                </TableCell>
                                <TableCell>
                                  <Tooltip
                                    title={formatFullTimestamp(ip.lastSeen)}
                                  >
                                    <span>{relativeTime(ip.lastSeen)}</span>
                                  </Tooltip>
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>

                        {/* Never let a capped list look complete. */}
                        {country.ipsTruncated > 0 && (
                          <Typography
                            variant="caption"
                            color="text.secondary"
                            sx={{ display: "block", p: 1 }}
                          >
                            + {formatNumber(country.ipsTruncated)} more
                            addresses not shown (raise with <code>?ips=</code>{" "}
                            on /api/drains/locations)
                          </Typography>
                        )}
                      </Box>
                    )}
                  </div>
                </Collapse>
              </li>
            );
          })}
        </ul>
      )}

      {(data?.countriesTruncated > 0 || data?.unknown?.requests > 0) && (
        <Typography
          variant="caption"
          color="text.secondary"
          sx={{ display: "block", mt: 1.5 }}
        >
          {data.countriesTruncated > 0 &&
            `+${data.countriesTruncated} more countries not shown. `}
          {data.unknown?.requests > 0 &&
            `${formatNumber(data.unknown.requests)} requests had no location at all (static assets and build logs often don't).`}
        </Typography>
      )}
    </div>
  );
}

LocationsPanel.propTypes = {
  hours: PropTypes.number.isRequired,
  // Bumped by the parent to force a refetch.
  nonce: PropTypes.number.isRequired,
  isDark: PropTypes.bool,
  hue: PropTypes.string,
};

LocationsPanel.defaultProps = { isDark: false, hue: null };
