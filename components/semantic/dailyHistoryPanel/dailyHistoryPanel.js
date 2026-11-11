"use client";

// components/DailyHistoryPanel.jsx
//
// Traffic beyond the raw event window. lib/store-redis.js / lib/store-file.js
// keep about a week of individual events (DRAIN_RETENTION_HOURS); this panel
// reads /api/drains/daily instead — one ~1KB rollup per calendar day
// (lib/daily-rollup.js), written nightly by /api/drains/rollup.
//
// Shows "busiest day" unique visitors rather than a total summed across days.

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
import { useFormatLocale, useT } from "../../../lib/i18n";
import RichText from "../richText";

// Labels come from locales/*/traffic.js (`daily.ranges`).
const DAY_RANGES = ["7", "30", "90"];

function formatDayTick(dateKey, locale) {
  const date = new Date(`${dateKey}T00:00:00.000Z`);
  if (Number.isNaN(date.getTime())) return dateKey;
  return date.toLocaleDateString(locale, { month: "short", day: "numeric" });
}

// `requestFailed` is the locale's fallback message; an `error` string from
// the API itself is shown as sent.
async function getJSON(url, requestFailed) {
  const res = await fetch(url, { cache: "no-store" });
  const json = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(json?.error || requestFailed(res.status));
  return json;
}

export default function DailyHistoryPanel({ isDark }) {
  const t = useT().traffic;
  const fmt = useFormatLocale();
  const dayTick = (dateKey) => formatDayTick(dateKey, fmt);
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
    getJSON(`/api/drains/daily?days=${daysKey}`, t.requestFailed)
      .then((json) => {
        if (cancelled) return;
        setData(json);
        setError(null);
      })
      .catch((err) => {
        if (!cancelled) setError(t.apiErrors[err.message] ?? err.message);
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
        totalTrafficRequests: day.totalTrafficRequests ?? null,
      })),
    [data],
  );

  const isEmpty = !loading && series.length === 0;

  return (
    <div className={styles.panel}>
      <div className={styles.head}>
        <div>
          <h3 className={styles.title}>{t.daily.title}</h3>
          <p className={styles.sub}>{t.daily.sub}</p>
        </div>
        <ToggleButtonGroup
          size="small"
          exclusive
          value={daysKey}
          onChange={(_e, v) => v && setDaysKey(v)}
        >
          {DAY_RANGES.map((key) => (
            <ToggleButton key={key} value={key}>
              {t.daily.ranges[key]}
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
          <AlertTitle>{t.daily.emptyTitle}</AlertTitle>
          <RichText parts={t.daily.emptyBody} />
        </Alert>
      )}

      {!isEmpty && !loading && (
        <>
          <div className={styles.tileRow}>
            <div className={styles.tile}>
              <p className={styles.tileLabel}>{t.tiles.totalRequests}</p>
              <div className={styles.tileValue}>
                {Number.isFinite(data?.totals?.totalTrafficRequests)
                  ? formatCompact(data.totals.totalTrafficRequests, fmt)
                  : "—"}
              </div>
              <p className={styles.tileHint}>
                {Number.isFinite(data?.totals?.totalTrafficRequests)
                  ? t.tiles.totalHint(
                      formatNumber(data.measuredCoverageDays ?? 0, fmt),
                      data.measuredCoverageDays,
                    )
                  : t.tiles.totalHintNone}
              </p>
            </div>
            <div className={styles.tile}>
              <p className={styles.tileLabel}>{t.tiles.backendRequests}</p>
              <div className={styles.tileValue}>
                {formatCompact(data?.totals?.requests ?? 0, fmt)}
              </div>
              <p className={styles.tileHint}>
                {t.daily.backendAcross(
                  formatNumber(series.length, fmt),
                  series.length,
                )}
                {Number.isFinite(data?.coveragePercent)
                  ? t.daily.coverage(
                      fmt
                        ? formatNumber(data.coveragePercent, fmt)
                        : data.coveragePercent,
                      !data?.measuredCoverageDays,
                    )
                  : ""}
              </p>
            </div>
            <div className={styles.tile}>
              <p className={styles.tileLabel}>{t.daily.busiestDay}</p>
              <div className={styles.tileValue}>
                {formatCompact(data?.totals?.busiestDayUniqueVisitors ?? 0, fmt)}
              </div>
              <p className={styles.tileHint}>{t.daily.busiestHint}</p>
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
                  tickFormatter={dayTick}
                  tick={{ fontSize: 12 }}
                  minTickGap={24}
                />
                <YAxis tick={{ fontSize: 12 }} allowDecimals={false} width={44} />
                <RechartsTooltip
                  formatter={(value, key) => [
                    formatNumber(value, fmt),
                    t.status[key] ?? key,
                  ]}
                  labelFormatter={dayTick}
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
