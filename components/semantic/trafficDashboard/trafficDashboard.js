"use client";

// components/TrafficDashboard.jsx
//
// The dashboard. Reads from this app's own /api/drains/stats and
// /api/drains/events endpoints (which read whatever the drain has ingested)
// and renders:
//
//   - stat tiles: requests, unique client IPs, error rate, routes, bots, bytes
//   - requests over time, stacked by HTTP status class
//   - status-class distribution
//   - top countries / routes / methods / browsers / OS / devices / regions /
//     hosts / IPs / log sources
//   - a live table with every field the drain provides, plus your own
//     console.log() fields
//
// Charting notes (worth keeping if you edit this):
//   - The status-class colours are a validated set; the legend always shows
//     numeric values and a table view is one click away, because the light-mode
//     4xx yellow sits under 3:1 contrast against the surface. Colour never
//     carries meaning alone here.
//   - Magnitude bars (top countries etc.) use ONE hue with length doing the
//     encoding — not a different colour per row.
//   - There is a single y-axis. Never add a second scale to these charts.

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import PropTypes from "prop-types";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";
import CircularProgress from "@mui/material/CircularProgress";
import FormControlLabel from "@mui/material/FormControlLabel";
import Link from "@mui/material/Link";
import MenuItem from "@mui/material/MenuItem";
import Paper from "@mui/material/Paper";
import Select from "@mui/material/Select";
import Stack from "@mui/material/Stack";
import Switch from "@mui/material/Switch";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TextField from "@mui/material/TextField";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/material/styles";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip as RechartsTooltip,
  XAxis,
  YAxis,
} from "recharts";

import styles from "./trafficDashboard.module.scss";
import LocationsPanel from "../locationsPanel/locationsPanel";
import {
  MAGNITUDE_HUE,
  STATUS_SERIES,
  TIME_RANGES,
  formatBucketTick,
  formatBytes,
  formatCompact,
  formatFullTimestamp,
  formatNumber,
  formatPercent,
} from "../../../lib/chart-theme";
import { countryFlag, countryName } from "../../../lib/vercel-regions";

const SURFACE = { light: "#fcfcfb", dark: "#1a1a19" };
const GRIDLINE = { light: "#e1e0d9", dark: "#2c2c2a" };
const BASELINE = { light: "#c3c2b7", dark: "#383835" };
const MUTED = "#898781";

/**
 * Status class for an HTTP code. Written as early returns rather than a chained
 * ternary so it stays readable (and satisfies no-nested-ternary).
 */
function statusClassFor(code) {
  if (!Number.isFinite(code)) return null;
  if (code >= 500) return "s5xx";
  if (code >= 400) return "s4xx";
  if (code >= 300) return "s3xx";
  return "s2xx";
}

/** Human label for the chart's time-bucket width. */
function bucketLabelFor(bucketMs) {
  if (bucketMs >= 86400000) return "1 day";
  if (bucketMs >= 3600000) return "1 hour";
  return `${bucketMs / 60000} min`;
}

/**
 * Subtitle for the events table.
 *
 * In public mode the rows have been altered on the way out — fields removed,
 * timestamps floored. Saying so is not just courtesy: a table captioned
 * "every field the drain delivered" while quietly serving reduced rows would
 * misrepresent both the data and the privacy posture.
 */
function eventsSubtitle(publicMode, meta) {
  if (!publicMode) return "Newest first · every field the drain delivered";

  const grain = meta?.timeGranularity ?? "minute";

  return [
    "Newest first",
    "public view: no addresses or user agents",
    `times rounded down to the ${grain}`,
  ].join(" · ");
}

async function getJSON(url) {
  const res = await fetch(url, { cache: "no-store" });
  const json = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(json?.error || `Request failed (${res.status})`);
  return json;
}

/* ------------------------------------------------------------------ tiles */

function StatTile({ label, value, hint }) {
  return (
    <div className={styles.tile}>
      <p className={styles.tileLabel}>{label}</p>
      <div className={styles.tileValue}>{value}</div>
      {hint ? <div className={styles.tileHint}>{hint}</div> : null}
    </div>
  );
}

StatTile.propTypes = {
  label: PropTypes.node.isRequired,
  value: PropTypes.node.isRequired,
  hint: PropTypes.node,
};

StatTile.defaultProps = { hint: null };

/* ------------------------------------------------------- magnitude bars */

function MagnitudeBars({ rows, hue, formatLabel, emptyText = "No data yet" }) {
  const max = useMemo(
    () => Math.max(1, ...rows.map((r) => Number(r.count) || 0)),
    [rows],
  );
  const total = useMemo(
    () => rows.reduce((sum, r) => sum + (Number(r.count) || 0), 0),
    [rows],
  );

  if (!rows.length) return <div className={styles.emptyBars}>{emptyText}</div>;

  return (
    <ul className={styles.barList}>
      {rows.map((row) => {
        const count = Number(row.count) || 0;
        const label = formatLabel ? formatLabel(row.key, row) : row.key;
        const share = total ? count / total : 0;
        return (
          <li key={row.key} className={styles.barRow}>
            <Tooltip
              title={String(label)}
              placement="top-start"
              enterDelay={600}
            >
              <span className={styles.barLabel}>{label}</span>
            </Tooltip>
            <span className={styles.barValue}>
              {formatNumber(count)}
              <span className={styles.barShare}>{formatPercent(share, 0)}</span>
            </span>
            <div className={styles.barTrack}>
              <div
                className={`${styles.barFill} ${
                  row.isOther ? styles.isOther : ""
                }`}
                style={{
                  width: `${Math.max(2, (count / max) * 100)}%`,
                  background: hue,
                }}
              />
            </div>
          </li>
        );
      })}
    </ul>
  );
}

MagnitudeBars.propTypes = {
  rows: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string,
      count: PropTypes.number,
      isOther: PropTypes.bool,
    }),
  ).isRequired,
  hue: PropTypes.string.isRequired,
  formatLabel: PropTypes.func,
  emptyText: PropTypes.string,
};

MagnitudeBars.defaultProps = { formatLabel: null, emptyText: "No data yet" };

function BreakdownPanel({ title, subtitle, rows, hue, formatLabel }) {
  return (
    <div className={styles.panel}>
      <div className={styles.panelHead}>
        <div>
          <h3 className={styles.panelTitle}>{title}</h3>
          {subtitle ? <p className={styles.panelSub}>{subtitle}</p> : null}
        </div>
      </div>
      <MagnitudeBars rows={rows ?? []} hue={hue} formatLabel={formatLabel} />
    </div>
  );
}

BreakdownPanel.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string,
  rows: PropTypes.arrayOf(PropTypes.shape({})),
  hue: PropTypes.string.isRequired,
  formatLabel: PropTypes.func,
};

BreakdownPanel.defaultProps = { subtitle: null, rows: [], formatLabel: null };

/* ------------------------------------------------------------- tooltip */

function StatusTooltip({ active, payload, label, colors }) {
  if (!active || !payload?.length) return null;
  const total = payload.reduce((sum, p) => sum + (Number(p.value) || 0), 0);

  return (
    <div className={styles.tooltip}>
      <p className={styles.tooltipTitle}>{formatFullTimestamp(label)}</p>
      {STATUS_SERIES.map((series) => {
        const entry = payload.find((p) => p.dataKey === series.key);
        const value = Number(entry?.value) || 0;
        if (!value) return null;
        return (
          <div key={series.key} className={styles.tooltipRow}>
            <span className={styles.tooltipLabel}>
              <span
                className={styles.legendSwatch}
                style={{ background: colors[series.key] }}
              />
              {series.label}
            </span>
            <span>{formatNumber(value)}</span>
          </div>
        );
      })}
      <div className={`${styles.tooltipRow} ${styles.tooltipTotal}`}>
        <span>Total</span>
        <span>{formatNumber(total)}</span>
      </div>
    </div>
  );
}

StatusTooltip.propTypes = {
  // Recharts injects these; none are guaranteed on first render.
  active: PropTypes.bool,
  payload: PropTypes.arrayOf(PropTypes.shape({})),
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  colors: PropTypes.objectOf(PropTypes.string).isRequired,
};

StatusTooltip.defaultProps = { active: false, payload: [], label: null };

/* ============================================================ dashboard */

export default function TrafficDashboard() {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";

  const surface = isDark ? SURFACE.dark : SURFACE.light;
  const gridline = isDark ? GRIDLINE.dark : GRIDLINE.light;
  const baseline = isDark ? BASELINE.dark : BASELINE.light;
  const magnitudeHue = isDark ? MAGNITUDE_HUE.dark : MAGNITUDE_HUE.light;
  const statusColor = useMemo(
    () =>
      STATUS_SERIES.reduce((acc, s) => {
        acc[s.key] = isDark ? s.dark : s.light;
        return acc;
      }, {}),
    [isDark],
  );

  const [rangeKey, setRangeKey] = useState("24h");
  const [autoRefresh, setAutoRefresh] = useState(true);
  const [nonce, setNonce] = useState(0);

  const [stats, setStats] = useState(null);
  const [statsError, setStatsError] = useState(null);
  const [loading, setLoading] = useState(true);

  const [showSeriesTable, setShowSeriesTable] = useState(false);

  const [events, setEvents] = useState([]);
  const [eventsError, setEventsError] = useState(null);
  // What the server did to the rows on the way out (timestamp granularity, city
  // threshold). Surfaced in the subtitle so the table doesn't quietly imply it
  // is showing raw data.
  const [eventsMeta, setEventsMeta] = useState(null);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const searchTimer = useRef(null);
  const [debouncedSearch, setDebouncedSearch] = useState("");

  const hours = useMemo(
    () => TIME_RANGES.find((r) => r.key === rangeKey)?.hours ?? 24,
    [rangeKey],
  );

  // Debounce the search box so typing doesn't hammer the endpoint.
  useEffect(() => {
    if (searchTimer.current) clearTimeout(searchTimer.current);
    searchTimer.current = setTimeout(() => setDebouncedSearch(search), 350);
    return () => {
      if (searchTimer.current) clearTimeout(searchTimer.current);
    };
  }, [search]);

  // --- stats ---
  useEffect(() => {
    let cancelled = false;
    getJSON(`/api/drains/stats?hours=${hours}`)
      .then((json) => {
        if (cancelled) return;
        setStats(json);
        setStatsError(null);
      })
      .catch((err) => {
        if (cancelled) return;
        setStatsError(err.message);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [hours, nonce]);

  // --- events ---
  useEffect(() => {
    let cancelled = false;
    const params = new URLSearchParams({ hours: String(hours), limit: "150" });
    if (debouncedSearch) params.set("q", debouncedSearch);
    if (statusFilter) params.set("status", statusFilter);

    getJSON(`/api/drains/events?${params.toString()}`)
      .then((json) => {
        if (cancelled) return;
        // Attach a stable key here rather than using the array index in JSX:
        // ids can repeat across a redelivery, so the composite keeps React's
        // reconciliation correct without an index-based key.
        const list = Array.isArray(json.events) ? json.events : [];
        setEvents(
          list.map((event, index) => ({
            ...event,
            rowKey: `${event.id ?? "event"}-${event.timestamp ?? 0}-${index}`,
          })),
        );
        setEventsMeta({
          timeGranularity: json.timeGranularity,
        });
        setEventsError(null);
      })
      .catch((err) => {
        if (cancelled) return;
        setEventsError(err.message);
      });
    return () => {
      cancelled = true;
    };
  }, [hours, nonce, debouncedSearch, statusFilter]);

  // --- auto refresh ---
  useEffect(() => {
    if (!autoRefresh) return undefined;
    // 60s, not 10s.
    //
    // Ten seconds made sense for a live one-hour view. On a multi-day window the
    // numbers barely move, and each tick is two aggregation reads over the whole
    // retention window — six times a minute, per open tab, against a database
    // billed by bandwidth. This was the other half of the Upstash request-size
    // problem.
    const id = setInterval(() => setNonce((n) => n + 1), 60000);
    return () => clearInterval(id);
  }, [autoRefresh]);

  const refresh = useCallback(() => setNonce((n) => n + 1), []);

  const totals = stats?.totals;
  const series = stats?.series ?? [];
  const bucketMs = stats?.window?.bucketMs ?? 3600000;
  const breakdowns = stats?.breakdowns ?? {};
  const hasData = (totals?.requests ?? 0) > 0;
  // Separate flags rather than a chained ternary in JSX (no-nested-ternary).
  const isLoading = loading && !stats;
  // Server-enforced: the API strips per-visitor data in public mode. This flag
  // only stops us rendering panels that would arrive empty.
  const publicMode = Boolean(stats?.publicMode);
  const showEmptyState = !isLoading && !hasData;

  const statusClassTotals = stats?.statusClasses ?? [];
  const statusGrandTotal = statusClassTotals.reduce((s, c) => s + c.count, 0);

  return (
    <div
      className={`${styles.mainTrafficWrapper} ${styles.root} ${
        isDark ? styles.dark : ""
      }`}
    >
      {/* ------------------------------------------------------- header */}
      <div className={styles.header}>
        <div>
          <Typography variant="h5" fontWeight={600}>
            Traffic &amp; API usage
          </Typography>
          <div className={styles.headerMeta}>
            <Typography variant="body2" color="text.secondary">
              {autoRefresh ? <span className={styles.liveDot} /> : null}
              Ingested via Vercel Log Drains
            </Typography>
            {stats?.store ? (
              <Chip
                size="small"
                variant="outlined"
                label={`${formatNumber(stats.store.count)} events stored`}
              />
            ) : null}
          </div>
        </div>

        <div className={styles.controls}>
          <ToggleButtonGroup
            size="small"
            exclusive
            value={rangeKey}
            onChange={(_e, v) => v && setRangeKey(v)}
          >
            {TIME_RANGES.map((r) => (
              <ToggleButton key={r.key} value={r.key}>
                {r.label}
              </ToggleButton>
            ))}
          </ToggleButtonGroup>
          <FormControlLabel
            control={
              <Switch
                size="small"
                checked={autoRefresh}
                onChange={(e) => setAutoRefresh(e.target.checked)}
              />
            }
            label={<Typography variant="body2">Auto</Typography>}
          />
          <Button size="small" variant="outlined" onClick={refresh}>
            Refresh
          </Button>
        </div>
      </div>

      {statsError && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {statsError}
        </Alert>
      )}

      {/* -------------------------------------------------- empty state */}
      {isLoading && (
        <Stack alignItems="center" sx={{ py: 8 }}>
          <CircularProgress />
        </Stack>
      )}
      {showEmptyState && (
        <Alert severity="info" sx={{ mb: 3 }}>
          <AlertTitle>No events yet</AlertTitle>
          Nothing has arrived at <code>/api/drains/ingest</code> in this window.
          Two ways forward:
          <Box component="ul" sx={{ pl: 3, my: 1 }}>
            <li>
              <strong>See it working right now</strong> — run{" "}
              <code>npm run seed</code> in another terminal to generate
              realistic sample traffic, then hit Refresh.
            </li>
            <li>
              <strong>Wire up the real drain</strong> — deploy this app, then in
              Vercel go to{" "}
              <em>
                Team Settings → Drains → Add Drain → Logs → Custom Endpoint
              </em>{" "}
              and point it at <code>https://your-app/api/drains/ingest</code>.
              See the README for the full walkthrough.
            </li>
          </Box>
        </Alert>
      )}

      {hasData && (
        <>
          {/* --------------------------------- stale raw-IP notice ------
              Anonymisation runs at ingest, so switching it on does NOT rewrite
              what's already stored. Without this warning the tile would read
              "Unique visitors" over a store that is still partly raw. */}
          {stats?.privacy?.mode &&
            stats.privacy.mode !== "off" &&
            totals.unanonymisedRecords > 0 && (
              <Alert severity="warning" sx={{ mb: 3 }}>
                <AlertTitle>
                  {formatNumber(totals.unanonymisedRecords)} stored record
                  {totals.unanonymisedRecords === 1 ? "" : "s"} still contain
                  raw IP addresses
                </AlertTitle>
                Anonymisation (<code>{stats.privacy.mode}</code>) is applied
                when events arrive, so turning it on does not rewrite data that
                was already stored. These records predate the setting. Clear the
                store (<code>npm run clear</code>) and let it refill, or accept
                that this window mixes raw and anonymised addresses.
              </Alert>
            )}

          {/* ------------------------------------------------ geo notice */}
          {totals.countryCoverage < 0.5 && (
            <Alert severity="info" className={styles.geoHint}>
              <AlertTitle>Country data only covers instrumented routes</AlertTitle>
              Only {formatPercent(totals.countryCoverage, 0)} of requests in
              this window carry a country. That&apos;s expected, not a data
              quality problem: country comes only from the{" "}
              <code>x-vercel-ip-country</code> header, and only the public
              climate-data API routes call <code>logRequest()</code> (see{" "}
              <code>lib/log-request.js</code>) to capture it. Traffic to other
              routes has no country at all — there is no edge-region fallback
              guess anymore.
            </Alert>
          )}

          {/* ---------------------------------------------------- tiles */}
          {publicMode && (
            <Alert severity="info" sx={{ mb: 3 }}>
              <AlertTitle>Public view</AlertTitle>
              This dashboard is published openly, so per-visitor detail is
              withheld: individual addresses, user agents, referrers and
              application fields are removed server-side. Aggregate figures —
              including the unique-visitor count — are shown in full.
            </Alert>
          )}

          <div className={styles.tileGrid}>
            <StatTile
              label="Requests"
              value={formatCompact(totals.requests)}
              // Requests != log entries: several entries can share a requestId.
              // Showing both makes the difference (and the billing basis) plain.
              hint={`from ${formatNumber(totals.logEvents)} log entries${
                totals.buildLogs
                  ? ` · ${formatNumber(totals.buildLogs)} build`
                  : ""
              }`}
            />
            {/* Label follows the active anonymisation mode — with truncated IPs
                this counts /24 subnets, not people, and saying "unique IPs"
                would overstate what the number means. */}
            <StatTile
              label={stats?.privacy?.uniqueLabel ?? "Unique IPs"}
              value={formatCompact(totals.uniqueIps)}
              hint={
                stats?.privacy?.uniqueHint ?? "Distinct client IP addresses"
              }
            />
            <StatTile
              label="Error rate"
              value={formatPercent(totals.errorRate)}
              hint={`${formatNumber(totals.errors)} 4xx+ · ${formatNumber(
                totals.serverErrors,
              )} 5xx`}
            />
            <StatTile
              label="Routes"
              value={formatCompact(totals.uniqueRoutes)}
              hint="Distinct paths hit"
            />
            <StatTile
              label="Bot traffic"
              value={formatPercent(
                totals.requests ? totals.botRequests / totals.requests : 0,
                0,
              )}
              hint={`${formatNumber(totals.botRequests)} requests`}
            />
            <StatTile
              label="Response bytes"
              value={formatBytes(totals.bytes)}
              hint="Sum of proxy.responseByteSize"
            />
          </div>

          {/* -------------------------------------- requests over time */}
          <div className={styles.panel}>
            <div className={styles.panelHead}>
              <div>
                <h3 className={styles.panelTitle}>Requests over time</h3>
                <p className={styles.panelSub}>
                  Stacked by status class · {bucketLabelFor(bucketMs)} buckets
                </p>
              </div>
              <Button
                size="small"
                onClick={() => setShowSeriesTable((v) => !v)}
              >
                {showSeriesTable ? "Hide table" : "Show table"}
              </Button>
            </div>

            <div className={styles.chartWrap}>
              <ResponsiveContainer width="100%" height={260}>
                <BarChart data={series} barCategoryGap="12%">
                  <CartesianGrid stroke={gridline} vertical={false} />
                  <XAxis
                    dataKey="t"
                    tickFormatter={(v) => formatBucketTick(v, bucketMs)}
                    stroke={baseline}
                    tick={{ fill: MUTED, fontSize: 12 }}
                    minTickGap={24}
                  />
                  <YAxis
                    stroke={baseline}
                    tick={{ fill: MUTED, fontSize: 12 }}
                    allowDecimals={false}
                    width={44}
                  />
                  <RechartsTooltip
                    cursor={{ fill: gridline, opacity: 0.4 }}
                    content={<StatusTooltip colors={statusColor} />}
                  />
                  {/* Stack order is semantic: success at the base, errors on
                      top, so an error spike is visible against the axis top.
                      The 1px surface-coloured stroke is the gap between
                      stacked segments. */}
                  {STATUS_SERIES.map((s) => (
                    <Bar
                      key={s.key}
                      dataKey={s.key}
                      stackId="status"
                      fill={statusColor[s.key]}
                      stroke={surface}
                      strokeWidth={1}
                      isAnimationActive={false}
                    />
                  ))}
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Legend is always present, with values — required relief for the
                light-mode 4xx yellow's sub-3:1 contrast. */}
            <ul className={styles.legend}>
              {STATUS_SERIES.map((s) => {
                const row = statusClassTotals.find((c) => c.key === s.key);
                return (
                  <li key={s.key} className={styles.legendItem}>
                    <span
                      className={styles.legendSwatch}
                      style={{ background: statusColor[s.key] }}
                    />
                    {s.label}
                    <span className={styles.legendValue}>
                      {formatNumber(row?.count ?? 0)}
                    </span>
                  </li>
                );
              })}
            </ul>

            {showSeriesTable && (
              <TableContainer
                component={Paper}
                variant="outlined"
                sx={{ maxHeight: 260, mt: 2 }}
              >
                <Table size="small" stickyHeader>
                  <TableHead>
                    <TableRow>
                      <TableCell>Bucket</TableCell>
                      {STATUS_SERIES.map((s) => (
                        <TableCell key={s.key} align="right">
                          {s.label}
                        </TableCell>
                      ))}
                      <TableCell align="right">Total</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {series
                      .filter((b) => b.total > 0)
                      .map((bucket) => (
                        <TableRow key={bucket.t}>
                          <TableCell>{formatFullTimestamp(bucket.t)}</TableCell>
                          {STATUS_SERIES.map((s) => (
                            <TableCell key={s.key} align="right">
                              {formatNumber(bucket[s.key])}
                            </TableCell>
                          ))}
                          <TableCell align="right">
                            <strong>{formatNumber(bucket.total)}</strong>
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </TableContainer>
            )}
          </div>

          {/* --------------------------------- status class distribution */}
          <div className={styles.panel}>
            <div className={styles.panelHead}>
              <div>
                <h3 className={styles.panelTitle}>Status classes</h3>
                <p className={styles.panelSub}>
                  Every bar is labelled, so the colours are reinforcement only
                </p>
              </div>
            </div>
            <ul className={styles.barList}>
              {statusClassTotals.map((row) => {
                const max = Math.max(
                  1,
                  ...statusClassTotals.map((c) => c.count),
                );
                const share = statusGrandTotal
                  ? row.count / statusGrandTotal
                  : 0;
                return (
                  <li key={row.key} className={styles.barRow}>
                    <span className={styles.barLabel}>{row.label}</span>
                    <span className={styles.barValue}>
                      {formatNumber(row.count)}
                      <span className={styles.barShare}>
                        {formatPercent(share, 0)}
                      </span>
                    </span>
                    <div className={styles.barTrack}>
                      <div
                        className={styles.barFill}
                        style={{
                          width: `${Math.max(2, (row.count / max) * 100)}%`,
                          background: statusColor[row.key],
                        }}
                      />
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* ------------------------------------- IPs by location tree */}
          <LocationsPanel
            hours={hours}
            nonce={nonce}
            isDark={isDark}
            hue={magnitudeHue}
          />

          {/* ----------------------------------------------- breakdowns */}
          <div className={styles.breakdownGrid}>
            <BreakdownPanel
              title="Countries"
              subtitle="From x-vercel-ip-country headers"
              rows={breakdowns.country}
              hue={magnitudeHue}
              formatLabel={(code) =>
                code === "Other"
                  ? "Other"
                  : `${countryFlag(code)} ${countryName(code)}`.trim()
              }
            />
            <BreakdownPanel
              title="Top routes"
              subtitle="Query strings stripped"
              rows={breakdowns.route}
              hue={magnitudeHue}
            />
            <BreakdownPanel
              title="Browsers"
              subtitle="Parsed from User-Agent"
              rows={breakdowns.browser}
              hue={magnitudeHue}
            />
            <BreakdownPanel
              title="Operating systems"
              rows={breakdowns.os}
              hue={magnitudeHue}
            />
            <BreakdownPanel
              title="Device types"
              rows={breakdowns.device}
              hue={magnitudeHue}
            />
            <BreakdownPanel
              title="HTTP methods"
              rows={breakdowns.method}
              hue={magnitudeHue}
            />
            <BreakdownPanel
              title="Status codes"
              subtitle="Exact codes, not classes"
              rows={breakdowns.statusCode}
              hue={magnitudeHue}
            />
            {!publicMode && (
              <BreakdownPanel
                title="Top client IPs"
                subtitle="Most active callers"
                rows={breakdowns.clientIp}
                hue={magnitudeHue}
              />
            )}
            <BreakdownPanel
              title="Hostnames"
              rows={breakdowns.host}
              hue={magnitudeHue}
            />
            <BreakdownPanel
              title="Log sources"
              subtitle="lambda = functions · edge = middleware/edge runtime"
              rows={breakdowns.source}
              hue={magnitudeHue}
            />
            {!publicMode && (
              <BreakdownPanel
                title="Referrers"
                rows={breakdowns.referer}
                hue={magnitudeHue}
              />
            )}
          </div>
        </>
      )}

      {/* ----------------------------------------------- events table */}
      <div className={styles.panel}>
        <div className={styles.panelHead}>
          <div>
            <h3 className={styles.panelTitle}>Live events</h3>
            <p className={styles.panelSub}>
              {eventsSubtitle(publicMode, eventsMeta)}
            </p>
          </div>
        </div>

        <div className={styles.tableToolbar}>
          <TextField
            size="small"
            placeholder={
              // The server narrows the searchable fields in public mode, so the
              // placeholder must not advertise a search it will refuse to run.
              publicMode
                ? "Search path, country, host…"
                : "Search path, IP, country, UA…"
            }
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            sx={{ minWidth: 240 }}
          />
          <Select
            size="small"
            displayEmpty
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            sx={{ minWidth: 140 }}
          >
            <MenuItem value="">All statuses</MenuItem>
            <MenuItem value="2xx">2xx only</MenuItem>
            <MenuItem value="3xx">3xx only</MenuItem>
            <MenuItem value="4xx">4xx only</MenuItem>
            <MenuItem value="5xx">5xx only</MenuItem>
          </Select>
          <Typography variant="caption" color="text.secondary">
            {formatNumber(events.length)} shown
          </Typography>
        </div>

        {eventsError && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {eventsError}
          </Alert>
        )}

        {/* minWidth forces horizontal scrolling rather than squeezing the last
            columns into an unreadable sliver. */}
        <TableContainer
          component={Paper}
          variant="outlined"
          sx={{ maxHeight: 520 }}
        >
          <Table
            size="small"
            stickyHeader
            className={styles.eventsTable}
            sx={{ minWidth: 1500 }}
          >
            <TableHead>
              <TableRow>
                <TableCell>Time</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Method</TableCell>
                <TableCell>Path</TableCell>
                {!publicMode && <TableCell>Client IP</TableCell>}
                <TableCell>Location</TableCell>
                <TableCell>Browser / OS</TableCell>
                <TableCell>Host</TableCell>
                <TableCell>Source</TableCell>
                <TableCell>Deployment</TableCell>
                {!publicMode && <TableCell>Your fields</TableCell>}
              </TableRow>
            </TableHead>
            <TableBody>
              {events.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={publicMode ? 9 : 11}>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ py: 2 }}
                    >
                      No events match. Try widening the time range or clearing
                      the search.
                    </Typography>
                  </TableCell>
                </TableRow>
              ) : (
                events.map((event) => {
                  const code = Number(event.statusCode);
                  const cls = statusClassFor(code);
                  return (
                    <TableRow key={event.rowKey} hover>
                      <TableCell className={styles.mono}>
                        {formatFullTimestamp(event.timestamp)}
                      </TableCell>
                      <TableCell>
                        {cls ? (
                          <span
                            className={styles.statusPill}
                            style={{ background: statusColor[cls] }}
                          >
                            {code}
                          </span>
                        ) : (
                          <Typography variant="caption" color="text.secondary">
                            —
                          </Typography>
                        )}
                      </TableCell>
                      <TableCell className={styles.mono}>
                        {event.method ?? "—"}
                      </TableCell>
                      <TableCell>
                        <Tooltip title={event.path ?? ""} enterDelay={500}>
                          <span className={`${styles.mono} ${styles.truncate}`}>
                            {event.path ?? "—"}
                          </span>
                        </Tooltip>
                      </TableCell>
                      {!publicMode && (
                        <TableCell className={styles.mono}>
                          {event.clientIp ?? "—"}
                        </TableCell>
                      )}
                      <TableCell>
                        {event.country ? (
                          <span>
                            {countryFlag(event.country)} {event.country}
                          </span>
                        ) : (
                          "—"
                        )}
                      </TableCell>
                      <TableCell>
                        <Tooltip title={event.userAgent ?? ""} enterDelay={500}>
                          <span>
                            {event.browser ?? "—"}
                            {event.os && event.os !== "Unknown"
                              ? ` / ${event.os}`
                              : ""}
                          </span>
                        </Tooltip>
                      </TableCell>
                      <TableCell className={styles.mono}>
                        <span
                          className={styles.truncate}
                          style={{ maxWidth: 160 }}
                        >
                          {event.host ?? "—"}
                        </span>
                      </TableCell>
                      <TableCell>
                        <Chip
                          size="small"
                          variant="outlined"
                          label={event.source ?? "?"}
                        />
                      </TableCell>
                      <TableCell className={styles.mono}>
                        <span
                          className={styles.truncate}
                          style={{ maxWidth: 120 }}
                        >
                          {event.deploymentId ?? "—"}
                        </span>
                      </TableCell>
                      {!publicMode && (
                        <TableCell>
                          {(() => {
                            if (!event.custom) return "—";
                            // Fields already shown in their own columns would just
                            // be noise here, so only YOUR extra fields are listed.
                            const shownElsewhere = new Set([
                              "country",
                              "clientIp",
                              "userAgent",
                              "path",
                              "method",
                              "host",
                              "loggedAt",
                              "referer",
                              "vercelId",
                              "deploymentUrl",
                              "continent",
                              "statusCode",
                            ]);
                            const text = Object.entries(event.custom)
                              .filter(([k]) => !shownElsewhere.has(k))
                              .map(([k, v]) => `${k}=${JSON.stringify(v)}`)
                              .join("  ");
                            if (!text) return "—";
                            return (
                              <Tooltip title={text} enterDelay={400}>
                                <span className={styles.customCell}>
                                  {text}
                                </span>
                              </Tooltip>
                            );
                          })()}
                        </TableCell>
                      )}
                    </TableRow>
                  );
                })
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </div>

      <Typography
        variant="caption"
        color="text.secondary"
        sx={{ display: "block", mt: 2 }}
      >
        Drain endpoint: <code>/api/drains/ingest</code> · Configure in Vercel
        under{" "}
        <Link
          href="https://vercel.com/docs/drains/using-drains"
          target="_blank"
          rel="noreferrer"
        >
          Team Settings → Drains
        </Link>
      </Typography>
      <Typography
        variant="caption"
        color="text.secondary"
        sx={{ display: "block", mt: 2 }}
      >
        For companies ESG data visit: <Link href="/esg">ESG</Link>
      </Typography>
    </div>
  );
}
