"use client";

// components/DailyHistoryPanel.jsx
//
// Traffic beyond the raw event window. lib/store-redis.js / lib/store-file.js
// only keep about a week of individual events (DRAIN_RETENTION_HOURS), so
// anything longer-range reads /api/drains/daily instead — one ~1KB rollup per
// calendar day (lib/daily-rollup.js), written nightly by /api/drains/rollup.
//
// No unique-visitor total is shown summed across days on purpose: a returning
// visitor would be counted once per day they showed up, inflating a month by
// 40-80%. "Busiest day" is the honest single-number headline instead.

import { useEffect, useMemo, useState } from "react";
import PropTypes from "prop-types";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import CircularProgress from "@mui/material/CircularProgress";
import Stack from "@mui/material/Stack";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip as RechartsTooltip,
  XAxis,
  YAxis,
} from "recharts";

import styles from "./dailyHistoryPanel.module.scss";
import { STATUS_SERIES, formatCompact, formatNumber } from "../../../lib/chart-theme";

const DAY_RANGES = [
  { key: "7", label: "7 days" },
  { key: "30", label: "30 days" },
  { key: "90", label: "90 days" },
];

function formatDayTick(dateKey) {
  const date = new Date(`${dateKey}T00:00:00.000Z`);
  if (Number.isNaN(date.getTime())) return dateKey;
  return date.toLocaleDateString(undefined, { month: "short", day: "numeric" });
}

async function getJSON(url) {
  const res = await fetch(url, { cache: "no-store" });
  const json = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(json?.error || `Request failed (${res.status})`);
  return json;
}

export default function DailyHistoryPanel({ isDark }) {
  const [daysKey, setDaysKey] = useState("30");
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const statusColor = useMemo(
    () =>
      STATUS_SERIES.reduce((acc, s) => {
        acc[s.key] = isDark ? s.dark : s.light;
        return acc;
      }, {}),
    [isDark],
  );

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    getJSON(`/api/drains/daily?days=${daysKey}`)
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
  }, [daysKey]);

  const series = useMemo(
    () =>
      (data?.days ?? []).map((day) => ({
        date: day.date,
        s2xx: day.statusClasses?.s2xx ?? 0,
        s3xx: day.statusClasses?.s3xx ?? 0,
        s4xx: day.statusClasses?.s4xx ?? 0,
        s5xx: day.statusClasses?.s5xx ?? 0,
        requests: day.requests ?? 0,
        uniqueVisitors: day.uniqueVisitors ?? 0,
      })),
    [data],
  );

  const isEmpty = !loading && series.length === 0;

  return (
    <div className={styles.panel}>
      <div className={styles.head}>
        <div>
          <h3 className={styles.title}>Daily history</h3>
          <p className={styles.sub}>
            One rollup per day · not limited by the ~7-day raw event window ·
            backend requests only, not CDN cache hits
          </p>
        </div>
        <ToggleButtonGroup
          size="small"
          exclusive
          value={daysKey}
          onChange={(_e, v) => v && setDaysKey(v)}
        >
          {DAY_RANGES.map((r) => (
            <ToggleButton key={r.key} value={r.key}>
              {r.label}
            </ToggleButton>
          ))}
        </ToggleButtonGroup>
      </div>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      {loading && !data && (
        <Stack alignItems="center" sx={{ py: 4 }}>
          <CircularProgress size={24} />
        </Stack>
      )}

      {isEmpty && (
        <Alert severity="info">
          <AlertTitle>No daily rollups yet</AlertTitle>
          Nothing in <code>drain:daily</code> for this range. It fills in once{" "}
          <code>/api/drains/rollup</code> has run at least once.
        </Alert>
      )}

      {!isEmpty && !loading && (
        <>
          <div className={styles.tileRow}>
            <div className={styles.tile}>
              <p className={styles.tileLabel}>Backend requests</p>
              <div className={styles.tileValue}>
                {formatCompact(data?.totals?.requests ?? 0)}
              </div>
              <p className={styles.tileHint}>
                across {formatNumber(series.length)} day
                {series.length === 1 ? "" : "s"}
                {Number.isFinite(data?.coveragePercent)
                  ? ` · ~${data.coveragePercent}% of real traffic (rest is cache hits)`
                  : ""}
              </p>
            </div>
            <div className={styles.tile}>
              <p className={styles.tileLabel}>Busiest day</p>
              <div className={styles.tileValue}>
                {formatCompact(data?.totals?.busiestDayUniqueVisitors ?? 0)}
              </div>
              <p className={styles.tileHint}>
                unique visitors, single day — not summed across days
              </p>
            </div>
          </div>

          <div className={styles.chartWrap}>
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={series} barCategoryGap="20%">
                <CartesianGrid
                  stroke="var(--dash-gridline, #e1e0d9)"
                  vertical={false}
                />
                <XAxis
                  dataKey="date"
                  tickFormatter={formatDayTick}
                  tick={{ fontSize: 12 }}
                  minTickGap={24}
                />
                <YAxis tick={{ fontSize: 12 }} allowDecimals={false} width={44} />
                <RechartsTooltip
                  formatter={(value, key) => [
                    formatNumber(value),
                    STATUS_SERIES.find((s) => s.key === key)?.label ?? key,
                  ]}
                  labelFormatter={formatDayTick}
                />
                {STATUS_SERIES.map((s) => (
                  <Bar
                    key={s.key}
                    dataKey={s.key}
                    stackId="status"
                    fill={statusColor[s.key]}
                    isAnimationActive={false}
                  />
                ))}
              </BarChart>
            </ResponsiveContainer>
          </div>
        </>
      )}
    </div>
  );
}

DailyHistoryPanel.propTypes = {
  isDark: PropTypes.bool,
};

DailyHistoryPanel.defaultProps = { isDark: false };
