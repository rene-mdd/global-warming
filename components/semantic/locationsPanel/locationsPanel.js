"use client";

// components/LocationsPanel.jsx
//

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
import {
  countryFlag,
  localizedCountryName,
} from "../../../lib/vercel-regions";
import { useFormatLocale, useT } from "../../../lib/i18n";
import RichText from "../richText";

/**
 * Picks the entry for the anonymisation mode from a { hash, truncate, other }
 * map in locales/{en,de}/traffic.js: the subtitle verb, the address column heading,
 * and the per-country count unit all have to match what is really stored.
 */
function forMode(map, mode) {
  return mode === "hash" || mode === "truncate" ? map[mode] : map.other;
}

function relativeTime(ms, t) {
  const delta = Date.now() - Number(ms);
  if (!Number.isFinite(delta)) return "—";
  const mins = Math.round(delta / 60000);
  if (mins < 1) return t.justNow;
  if (mins < 60) return t.minutes(mins);
  const hours = Math.round(mins / 60);
  if (hours < 24) return t.hours(hours);
  return t.days(Math.round(hours / 24));
}

export default function LocationsPanel({ hours, nonce, isDark, hue }) {
  const t = useT().traffic.locations;
  const tt = useT().traffic;
  const fmt = useFormatLocale();
  const countryName = (code) =>
    code ? localizedCountryName(code, fmt) : tt.unknownCountry;
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
          throw new Error(json?.error || tt.requestFailed(res.status));
        return json;
      })
      .then((json) => {
        if (cancelled) return;
        setData(json);
        setError(null);
      })
      .catch((err) => {
        if (!cancelled) setError(tt.apiErrors[err.message] ?? err.message);
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
      const name = localizedCountryName(c.country, fmt);
      if (name.toLowerCase().includes(q)) return true;
      if (c.country.toLowerCase().includes(q)) return true;
      return c.ips.some((ip) => ip.ip.toLowerCase().includes(q));
    });
  }, [data, filter, fmt]);

  const maxRequests = useMemo(
    () => Math.max(1, ...(data?.countries ?? []).map((c) => c.requests)),
    [data],
  );

  // Either IP storage is off entirely, or we're in public mode and the server
  // withheld the address lists.
  const ipsHidden = data?.privacy?.mode === "drop" || Boolean(data?.publicMode);
  const isLoading = loading && !data;
  const isEmpty = !isLoading && countries.length === 0;
  const showList = !isLoading && countries.length > 0;

  return (
    <div className={styles.panel}>
      <div className={styles.head}>
        <div>
          <h3 className={styles.title}>{t.title}</h3>
          <p className={styles.sub}>
            {t.sub}
            {data?.privacy?.mode && data.privacy.mode !== "off"
              ? t.ipsAre(forMode(t.ipMode, data.privacy.mode))
              : ""}
          </p>
        </div>
        <TextField
          size="small"
          placeholder={t.filter}
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
          <RichText parts={t.dropNotice} />
        </Alert>
      )}

      {isLoading && (
        <Stack alignItems="center" sx={{ py: 4 }}>
          <CircularProgress size={24} />
        </Stack>
      )}
      {isEmpty && (
        <Typography variant="body2" color="text.secondary" sx={{ py: 3 }}>
          {filter ? t.noMatch : t.noData}
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
                  </span>

                  <span className={styles.countryStats}>
                    <span className={styles.statNum}>
                      {formatNumber(country.requests, fmt)}
                    </span>
                    <span className={styles.statLabel}>{t.req}</span>
                    {!ipsHidden && (
                      <>
                        <span className={styles.statNum}>
                          {formatNumber(country.uniqueIps, fmt)}
                        </span>
                        {/* Label matches what the number counts. */}
                        <span className={styles.statLabel}>
                          {forMode(t.countUnit, data?.privacy?.mode)}
                        </span>
                      </>
                    )}
                    {country.errors > 0 && (
                      <Tooltip
                        title={t.errTooltip(formatNumber(country.errors, fmt))}
                      >
                        <span className={styles.errBadge}>
                          {t.err(formatPercent(errorRate, 0, fmt))}
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
                    {ipsHidden || country.ips.length === 0 ? (
                      <Typography variant="caption" color="text.secondary">
                        {data?.publicMode ? t.withheld : t.disabled}
                      </Typography>
                    ) : (
                      <Box className={styles.tableWrap}>
                        <Table size="small">
                          <TableHead>
                            <TableRow>
                              <TableCell>
                                {forMode(t.addressHeading, data?.privacy?.mode)}
                              </TableCell>
                              <TableCell align="right">
                                {t.columns.requests}
                              </TableCell>
                              <TableCell align="right">
                                {t.columns.errors}
                              </TableCell>
                              <TableCell>{t.columns.topRoute}</TableCell>
                              <TableCell>{t.columns.client}</TableCell>
                              <TableCell>{t.columns.firstSeen}</TableCell>
                              <TableCell>{t.columns.lastSeen}</TableCell>
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
                                      label={t.bot}
                                      variant="outlined"
                                      sx={{
                                        ml: 0.75,
                                        height: 18,
                                        fontSize: 10,
                                      }}
                                    />
                                  )}
                                </TableCell>
                                <TableCell align="right">
                                  {formatNumber(ip.requests, fmt)}
                                </TableCell>
                                <TableCell align="right">
                                  {ip.errors ? formatNumber(ip.errors, fmt) : "—"}
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
                                    title={formatFullTimestamp(ip.firstSeen, fmt)}
                                  >
                                    <span>
                                      {relativeTime(ip.firstSeen, t.relative)}
                                    </span>
                                  </Tooltip>
                                </TableCell>
                                <TableCell>
                                  <Tooltip
                                    title={formatFullTimestamp(ip.lastSeen, fmt)}
                                  >
                                    <span>
                                      {relativeTime(ip.lastSeen, t.relative)}
                                    </span>
                                  </Tooltip>
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>

                        {/* Shown when the server truncated the address list. */}
                        {country.ipsTruncated > 0 && (
                          <Typography
                            variant="caption"
                            color="text.secondary"
                            sx={{ display: "block", p: 1 }}
                          >
                            <RichText
                              parts={t.moreAddresses(
                                formatNumber(country.ipsTruncated, fmt),
                              )}
                            />
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
            t.moreCountries(
              fmt
                ? formatNumber(data.countriesTruncated, fmt)
                : data.countriesTruncated,
            )}
          {data.unknown?.requests > 0 &&
            t.noLocation(formatNumber(data.unknown.requests, fmt))}
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
