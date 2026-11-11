"use client";

// components/TrafficDashboard.jsx
//
// The dashboard. Reads from this app's own /api/drains/stats and
// /api/drains/events endpoints and renders:
//
//   - stat tiles: requests, unique client IPs, error rate, routes, bots, bytes
//   - requests over time, stacked by HTTP status class
//   - status-class distribution
//   - top countries / routes / methods / browsers / OS / devices / regions /
//     hosts / IPs / log sources
//   - a live table with every field the drain provides, plus custom
//     console.log() fields
//
// Charting rules:
//   - The status-class legend always shows numeric values, with a table view
//     one click away. Colour never carries meaning alone.
//   - Magnitude bars (top countries etc.) use one hue with length doing the
//     encoding — not a different colour per row.
//   - Every chart has a single y-axis.

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import PropTypes from "prop-types";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
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
import DailyHistoryPanel from "../dailyHistoryPanel/dailyHistoryPanel";
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
import { countryFlag, localizedCountryName } from "../../../lib/vercel-regions";
import { useFormatLocale, useLocale, useT } from "../../../lib/i18n";
import { DEFAULT_LOCALE, linkLocale } from "../../../lib/i18n-config";
import RichText from "../richText";

const SURFACE = { light: "#fcfcfb", dark: "#1a1a19" };
const GRIDLINE = { light: "#e1e0d9", dark: "#2c2c2a" };
const BASELINE = { light: "#c3c2b7", dark: "#383835" };
const MUTED = "#898781";

/** Maps an HTTP status code to its status class (s2xx/s3xx/s4xx/s5xx). */
function statusClassFor(code) {
  if (!Number.isFinite(code)) return null;
  if (code >= 500) return "s5xx";
  if (code >= 400) return "s4xx";
  if (code >= 300) return "s3xx";
  return "s2xx";
}

/** Human label for the chart's time-bucket width. */
function bucketLabelFor(bucketMs, t) {
  if (bucketMs >= 86400000) return t.bucket.day;
  if (bucketMs >= 3600000) return t.bucket.hour;
  return t.bucket.minutes(bucketMs / 60000);
}

/**
 * Subtitle for the events table. In public mode, states that fields were
 * removed and timestamps floored, and the current time granularity.
 */
function eventsSubtitle(publicMode, meta, t) {
  if (!publicMode) return t.live.subtitlePrivate;

  const grain = meta?.timeGranularity ?? "minute";

  return [t.live.newestFirst, t.live.publicView, t.live.roundedDown(grain)].join(
    " · ",
  );
}

// `requestFailed` is the locale's fallback message; an `error` string from
// the API itself is shown as sent.
async function getJSON(url, requestFailed) {
  const res = await fetch(url, { cache: "no-store" });
  const json = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(json?.error || requestFailed(res.status));
  return json;
}

/* ------------------------------------------------------------------ tiles */

function StatTile({ label, value, hint, loading }) {
  return (
    <div className={`${styles.tile} ${loading ? styles.tileRefreshing : ""}`}>
      <p className={styles.tileLabel}>{label}</p>
      <div className={styles.tileValue}>{value}</div>
      {hint ? <div className={styles.tileHint}>{hint}</div> : null}
      {loading && (
        <CircularProgress
          size={14}
          thickness={5}
          className={styles.tileSpinner}
        />
      )}
    </div>
  );
}

StatTile.propTypes = {
  label: PropTypes.node.isRequired,
  value: PropTypes.node.isRequired,
  hint: PropTypes.node,
  loading: PropTypes.bool,
};

StatTile.defaultProps = { hint: null, loading: false };

/* ------------------------------------------------------- magnitude bars */

function MagnitudeBars({ rows, hue, formatLabel, emptyText }) {
  const t = useT().traffic;
  const fmt = useFormatLocale();
  const max = useMemo(
    () => Math.max(1, ...rows.map((r) => Number(r.count) || 0)),
    [rows],
  );
  const total = useMemo(
    () => rows.reduce((sum, r) => sum + (Number(r.count) || 0), 0),
    [rows],
  );

  if (!rows.length) {
    return <div className={styles.emptyBars}>{emptyText ?? t.noData}</div>;
  }

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
              {formatNumber(count, fmt)}
              <span className={styles.barShare}>
                {formatPercent(share, 0, fmt)}
              </span>
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

MagnitudeBars.defaultProps = { formatLabel: null, emptyText: null };

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
  const t = useT().traffic;
  const fmt = useFormatLocale();
  if (!active || !payload?.length) return null;
  const total = payload.reduce((sum, p) => sum + (Number(p.value) || 0), 0);

  return (
    <div className={styles.tooltip}>
      <p className={styles.tooltipTitle}>{formatFullTimestamp(label, fmt)}</p>
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
              {t.status[series.key]}
            </span>
            <span>{formatNumber(value, fmt)}</span>
          </div>
        );
      })}
      <div className={`${styles.tooltipRow} ${styles.tooltipTotal}`}>
        <span>{t.overTime.total}</span>
        <span>{formatNumber(total, fmt)}</span>
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
  const t = useT().traffic;
  const locale = useLocale();
  const fmt = useFormatLocale();
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
  // Mirrors `loading` for the auto-refresh interval below, whose closure
  // otherwise only ever sees the `loading` value from when it was created.
  const loadingRef = useRef(loading);

  // Totals from the daily rollup (all edge traffic: cache hits + backend).
  const [dailyTotals, setDailyTotals] = useState(null);
  const [dailyLoading, setDailyLoading] = useState(true);
  const dailyLoadingRef = useRef(dailyLoading);

  const [showSeriesTable, setShowSeriesTable] = useState(false);

  const [events, setEvents] = useState([]);
  const [eventsError, setEventsError] = useState(null);
  // Server-applied transforms on the rows (timestamp granularity, city
  // threshold), shown in the subtitle.
  const [eventsMeta, setEventsMeta] = useState(null);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const searchTimer = useRef(null);
  const [debouncedSearch, setDebouncedSearch] = useState("");

  const hours = useMemo(
    () => TIME_RANGES.find((r) => r.key === rangeKey)?.hours ?? 24,
    [rangeKey],
  );

  // Debounces the search box.
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
    setLoading(true);
    getJSON(`/api/drains/stats?hours=${hours}`, t.requestFailed)
      .then((json) => {
        if (cancelled) return;
        setStats(json);
        setStatsError(null);
      })
      .catch((err) => {
        if (cancelled) return;
        setStatsError(t.apiErrors[err.message] ?? err.message);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [hours, nonce]);

  // --- daily totals (all edge traffic, for the tile grid) ---
  useEffect(() => {
    let cancelled = false;
    setDailyLoading(true);
    const days = Math.max(1, Math.ceil(hours / 24));
    getJSON(`/api/drains/daily?days=${days}`, t.requestFailed)
      .then((json) => {
        if (cancelled) return;
        setDailyTotals(
          json.totals
            ? {
                ...json.totals,
                measuredCoverageDays: json.measuredCoverageDays,
              }
            : null,
        );
      })
      .catch(() => {
        if (!cancelled) setDailyTotals(null);
      })
      .finally(() => {
        if (!cancelled) setDailyLoading(false);
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

    getJSON(`/api/drains/events?${params.toString()}`, t.requestFailed)
      .then((json) => {
        if (cancelled) return;
        // Builds a stable row key from id, timestamp, and index.
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
        setEventsError(t.apiErrors[err.message] ?? err.message);
      });
    return () => {
      cancelled = true;
    };
  }, [hours, nonce, debouncedSearch, statusFilter]);

  useEffect(() => {
    loadingRef.current = loading;
  }, [loading]);
  useEffect(() => {
    dailyLoadingRef.current = dailyLoading;
  }, [dailyLoading]);

  // --- auto refresh ---
  useEffect(() => {
    if (!autoRefresh) return undefined;
    // Skips a tick while either fetch is still in flight — bumping nonce
    // anyway would cancel it without aborting the request, so a slow range
    // could miss every tick forever and never clear its loading state.
    const id = setInterval(() => {
      if (loadingRef.current || dailyLoadingRef.current) return;
      setNonce((n) => n + 1);
    }, 60000);
    return () => clearInterval(id);
  }, [autoRefresh]);

  const refresh = useCallback(() => setNonce((n) => n + 1), []);

  const totals = stats?.totals;
  const series = stats?.series ?? [];
  const bucketMs = stats?.window?.bucketMs ?? 3600000;
  const breakdowns = stats?.breakdowns ?? {};
  const hasData = (totals?.requests ?? 0) > 0;
  // True only while the initial request is in flight, before any stats arrive.
  const isLoading = loading && !stats;
  // True while a later request (e.g. a range switch) is in flight but stale
  // stats from the previous range are still on screen — the full-page
  // spinner above only covers the first case, so tiles need their own cue.
  const refreshing = loading && Boolean(stats);
  // Same idea, for the separate /api/drains/daily fetch behind "Total requests".
  const dailyRefreshing = dailyLoading && Boolean(dailyTotals);
  // True when the API is serving reduced data with per-visitor fields stripped.
  const publicMode = Boolean(stats?.publicMode);
  // Estimated share of total traffic this view captures
  // (DASHBOARD_TRAFFIC_COVERAGE_PERCENT), refreshed manually — see
  // lib/api-read.js.

  // Country names come from ISO codes, so they follow the page locale.
  const countryLabel = (code) => {
    if (code === "Other") return t.other;
    if (!code) return t.unknownCountry;
    return `${countryFlag(code)} ${localizedCountryName(code, fmt)}`.trim();
  };
  // Browser, OS, device, source and the "Other" row arrive as English words.
  const valueLabel = (value) => t.valueLabels[value] ?? value;
  // /esg is a plain MUI <a>, so the locale prefix is added by hand.
  const esgLocale = linkLocale("/esg", locale);
  const esgHref = esgLocale === DEFAULT_LOCALE ? "/esg" : `/${esgLocale}/esg`;

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
            {t.header.title}
          </Typography>
          <div className={styles.headerMeta}>
            <Typography variant="body2" color="text.secondary">
              {autoRefresh ? <span className={styles.liveDot} /> : null}
              {t.header.source}
            </Typography>
            {stats?.store ? (
              <Chip
                size="small"
                variant="outlined"
                label={t.header.eventsStored(formatNumber(stats.store.count, fmt))}
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
                {t.ranges[r.key] ?? r.label}
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
            label={<Typography variant="body2">{t.header.auto}</Typography>}
          />
          <Button size="small" variant="outlined" onClick={refresh}>
            {t.header.refresh}
          </Button>
        </div>
      </div>

      {/* Log Drains only fire when a request reaches a Function, so they
          never see a CDN cache HIT for these routes. Shown for every time
          range. */}
      <Alert severity="warning" sx={{ mb: 3 }}>
        <AlertTitle>{t.backendOnly.title}</AlertTitle>
        {t.backendOnly.body}
      </Alert>

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

      {hasData && (
        <>
          {/* ------------------------------------------------ geo notice */}
          {totals.countryCoverage < 0.5 && (
            <Alert severity="info" className={styles.geoHint}>
              <AlertTitle>{t.geo.title}</AlertTitle>
              <RichText
                parts={t.geo.body(
                  formatPercent(totals.countryCoverage, 0, fmt),
                )}
              />
            </Alert>
          )}

          {/* ---------------------------------------------------- tiles */}
          {publicMode && (
            <Alert severity="info" sx={{ mb: 3 }}>
              <AlertTitle>{t.publicView.title}</AlertTitle>
              {t.publicView.body}
            </Alert>
          )}

          <div className={styles.tileGrid}>
            <StatTile
              label={t.tiles.totalRequests}
              value={
                Number.isFinite(dailyTotals?.totalTrafficRequests)
                  ? formatCompact(dailyTotals.totalTrafficRequests, fmt)
                  : "—"
              }
              hint={
                Number.isFinite(dailyTotals?.totalTrafficRequests)
                  ? t.tiles.totalHint(
                      formatNumber(dailyTotals.measuredCoverageDays ?? 0, fmt),
                      dailyTotals.measuredCoverageDays,
                    )
                  : t.tiles.totalHintNone
              }
              loading={dailyRefreshing}
            />
            <StatTile
              label={t.tiles.backendRequests}
              value={formatCompact(totals.requests, fmt)}
              // A request can span multiple log entries sharing one requestId.
              // "Backend" excludes CDN cache hits — see the warning banner.
              hint={t.tiles.backendHint(
                formatNumber(totals.logEvents, fmt),
                totals.buildLogs ? formatNumber(totals.buildLogs, fmt) : null,
              )}
              loading={refreshing}
            />
            {/* Label follows the active anonymisation mode — with truncated IPs
                this counts /24 subnets, not people. */}
            {/* <StatTile
              label={stats?.privacy?.uniqueLabel ?? "Unique addresses"}
              value={formatCompact(totals.uniqueIps)}
              hint={
                stats?.privacy?.uniqueHint ?? "Distinct client IP addresses"
              }
              loading={refreshing}
            /> */}
            <StatTile
              label={t.tiles.errorRate}
              value={formatPercent(totals.errorRate, 1, fmt)}
              hint={t.tiles.errorHint(
                formatNumber(totals.errors, fmt),
                formatNumber(totals.serverErrors, fmt),
              )}
              loading={refreshing}
            />
            <StatTile
              label={t.tiles.routes}
              value={formatCompact(totals.uniqueRoutes, fmt)}
              hint={t.tiles.routesHint}
              loading={refreshing}
            />
            <StatTile
              label={t.tiles.bots}
              value={formatPercent(
                totals.requests ? totals.botRequests / totals.requests : 0,
                0,
                fmt,
              )}
              hint={t.tiles.botsHint(formatNumber(totals.botRequests, fmt))}
              loading={refreshing}
            />
            <StatTile
              label={t.tiles.bytes}
              value={formatBytes(totals.bytes, fmt)}
              hint={t.tiles.bytesHint}
              loading={refreshing}
            />
          </div>

          {/* -------------------------------------- requests over time */}
          <div className={styles.panel}>
            <div className={styles.panelHead}>
              <div>
                <h3 className={styles.panelTitle}>{t.overTime.title}</h3>
                <p className={styles.panelSub}>
                  {t.overTime.sub(bucketLabelFor(bucketMs, t))}
                </p>
              </div>
              <Button
                size="small"
                onClick={() => setShowSeriesTable((v) => !v)}
              >
                {showSeriesTable ? t.overTime.hideTable : t.overTime.showTable}
              </Button>
            </div>

            <div className={styles.chartWrap}>
              <ResponsiveContainer width="100%" height={260}>
                <BarChart data={series} barCategoryGap="12%">
                  <CartesianGrid stroke={gridline} vertical={false} />
                  <XAxis
                    dataKey="t"
                    tickFormatter={(v) => formatBucketTick(v, bucketMs, fmt)}
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
                  {/* Stacked bottom to top: success, then warnings, then
                      errors. The 1px surface-coloured stroke separates the
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

            {/* Legend is always shown, with numeric values. */}
            <ul className={styles.legend}>
              {STATUS_SERIES.map((s) => {
                const row = statusClassTotals.find((c) => c.key === s.key);
                return (
                  <li key={s.key} className={styles.legendItem}>
                    <span
                      className={styles.legendSwatch}
                      style={{ background: statusColor[s.key] }}
                    />
                    {t.status[s.key]}
                    <span className={styles.legendValue}>
                      {formatNumber(row?.count ?? 0, fmt)}
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
                      <TableCell>{t.overTime.bucketColumn}</TableCell>
                      {STATUS_SERIES.map((s) => (
                        <TableCell key={s.key} align="right">
                          {t.status[s.key]}
                        </TableCell>
                      ))}
                      <TableCell align="right">{t.overTime.total}</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {series
                      .filter((b) => b.total > 0)
                      .map((bucket) => (
                        <TableRow key={bucket.t}>
                          <TableCell>
                            {formatFullTimestamp(bucket.t, fmt)}
                          </TableCell>
                          {STATUS_SERIES.map((s) => (
                            <TableCell key={s.key} align="right">
                              {formatNumber(bucket[s.key], fmt)}
                            </TableCell>
                          ))}
                          <TableCell align="right">
                            <strong>{formatNumber(bucket.total, fmt)}</strong>
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
                <h3 className={styles.panelTitle}>{t.statusClasses.title}</h3>
                <p className={styles.panelSub}>{t.statusClasses.sub}</p>
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
                    {/* The API's label is English; the key picks this
                        locale's. */}
                    <span className={styles.barLabel}>
                      {t.status[row.key] ?? row.label}
                    </span>
                    <span className={styles.barValue}>
                      {formatNumber(row.count, fmt)}
                      <span className={styles.barShare}>
                        {formatPercent(share, 0, fmt)}
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
              title={t.breakdowns.country.title}
              subtitle={t.breakdowns.country.sub}
              rows={breakdowns.country}
              hue={magnitudeHue}
              formatLabel={countryLabel}
            />
            <BreakdownPanel
              title={t.breakdowns.route.title}
              subtitle={t.breakdowns.route.sub}
              rows={breakdowns.route}
              hue={magnitudeHue}
              formatLabel={valueLabel}
            />
            <BreakdownPanel
              title={t.breakdowns.browser.title}
              subtitle={t.breakdowns.browser.sub}
              rows={breakdowns.browser}
              hue={magnitudeHue}
              formatLabel={valueLabel}
            />
            <BreakdownPanel
              title={t.breakdowns.os.title}
              rows={breakdowns.os}
              hue={magnitudeHue}
              formatLabel={valueLabel}
            />
            <BreakdownPanel
              title={t.breakdowns.device.title}
              rows={breakdowns.device}
              hue={magnitudeHue}
              formatLabel={valueLabel}
            />
            <BreakdownPanel
              title={t.breakdowns.method.title}
              rows={breakdowns.method}
              hue={magnitudeHue}
              formatLabel={valueLabel}
            />
            <BreakdownPanel
              title={t.breakdowns.statusCode.title}
              subtitle={t.breakdowns.statusCode.sub}
              rows={breakdowns.statusCode}
              hue={magnitudeHue}
              formatLabel={valueLabel}
            />
            {!publicMode && (
              <BreakdownPanel
                title={t.breakdowns.clientIp.title}
                subtitle={t.breakdowns.clientIp.sub}
                rows={breakdowns.clientIp}
                hue={magnitudeHue}
                formatLabel={valueLabel}
              />
            )}
            <BreakdownPanel
              title={t.breakdowns.host.title}
              rows={breakdowns.host}
              hue={magnitudeHue}
              formatLabel={valueLabel}
            />
            <BreakdownPanel
              title={t.breakdowns.source.title}
              subtitle={t.breakdowns.source.sub}
              rows={breakdowns.source}
              hue={magnitudeHue}
              formatLabel={valueLabel}
            />
            {!publicMode && (
              <BreakdownPanel
                title={t.breakdowns.referer.title}
                rows={breakdowns.referer}
                hue={magnitudeHue}
                formatLabel={valueLabel}
              />
            )}
          </div>
        </>
      )}

      {/* Always rendered, independent of hasData — reads /api/drains/daily
          rather than the raw event window. */}
      <DailyHistoryPanel isDark={isDark} />

      {/* ----------------------------------------------- events table */}
      <div className={styles.panel}>
        <div className={styles.panelHead}>
          <div>
            <h3 className={styles.panelTitle}>{t.live.title}</h3>
            <p className={styles.panelSub}>
              {eventsSubtitle(publicMode, eventsMeta, t)}
            </p>
          </div>
        </div>

        <div className={styles.tableToolbar}>
          <TextField
            size="small"
            placeholder={
              // Reflects the fields actually searchable in public mode.
              publicMode ? t.live.searchPublic : t.live.searchPrivate
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
            <MenuItem value="">{t.live.allStatuses}</MenuItem>
            {["2xx", "3xx", "4xx", "5xx"].map((cls) => (
              <MenuItem key={cls} value={cls}>
                {t.live.statusOnly(cls)}
              </MenuItem>
            ))}
          </Select>
          <Typography variant="caption" color="text.secondary">
            {t.live.shown(formatNumber(events.length, fmt))}
          </Typography>
        </div>

        {eventsError && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {eventsError}
          </Alert>
        )}

        {/* minWidth forces horizontal scrolling on the table. */}
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
                <TableCell>{t.live.columns.time}</TableCell>
                <TableCell>{t.live.columns.status}</TableCell>
                <TableCell>{t.live.columns.method}</TableCell>
                <TableCell>{t.live.columns.path}</TableCell>
                {!publicMode && <TableCell>{t.live.columns.clientIp}</TableCell>}
                <TableCell>{t.live.columns.location}</TableCell>
                <TableCell>{t.live.columns.browserOs}</TableCell>
                <TableCell>{t.live.columns.host}</TableCell>
                <TableCell>{t.live.columns.source}</TableCell>
                <TableCell>{t.live.columns.deployment}</TableCell>
                {!publicMode && <TableCell>{t.live.columns.yourFields}</TableCell>}
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
                      {t.live.empty}
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
                        {formatFullTimestamp(event.timestamp, fmt)}
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
                            {event.browser ? valueLabel(event.browser) : "—"}
                            {event.os && event.os !== "Unknown"
                              ? ` / ${valueLabel(event.os)}`
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
                          label={event.source ? valueLabel(event.source) : "?"}
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
                            // Excludes fields already shown in their own
                            // columns; lists only the rest.
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
        {t.footer.drainEndpoint} <code>/api/drains/ingest</code>{" "}
        {t.footer.configuredIn}{" "}
        <Link
          href="https://vercel.com/docs/drains/using-drains"
          target="_blank"
          rel="noreferrer"
        >
          {t.footer.drainsLink}
        </Link>
      </Typography>
      <Typography
        variant="caption"
        color="text.secondary"
        sx={{ display: "block", mt: 2 }}
      >
        {t.footer.esg} <Link href={esgHref}>ESG</Link>
      </Typography>
    </div>
  );
}
