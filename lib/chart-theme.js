// lib/chart-theme.js — browser-safe (no secrets, no node APIs)
//
// Chart colors and formatters.
//
// ---------------------------------------------------------------------------
// About these specific hex values
// ---------------------------------------------------------------------------
// The four status-class colors form a categorical series for a stacked chart.
// They clear a lightness band, chroma floor, colour-blind separation (worst
// adjacent pair ΔE 15.3 light / 10.2 dark, floor 8) and normal-vision
// separation (20.8 light / 16.9 dark, floor 15).
//
// The light-mode 4xx yellow (#eda100) measures 2.11:1 against the light
// surface, below the 3:1 bar. This chart always ships a legend with visible
// numeric labels plus a table view; colour never carries the meaning alone.
//
// Dark values are separate steps chosen for the dark surface, not an
// automatic lightening of the light ones.

export const STATUS_SERIES = [
  { key: "s2xx", label: "2xx success", light: "#008300", dark: "#008300" },
  { key: "s3xx", label: "3xx redirect", light: "#2a78d6", dark: "#3987e5" },
  { key: "s4xx", label: "4xx client error", light: "#eda100", dark: "#c98500" },
  { key: "s5xx", label: "5xx server error", light: "#e34948", dark: "#d03b3b" },
];

/** Single hue for magnitude bars (top countries, routes, ...); length encodes
 * magnitude, not colour. */
export const MAGNITUDE_HUE = { light: "#2a78d6", dark: "#3987e5" };

export function statusColors(isDark) {
  return STATUS_SERIES.reduce((acc, s) => {
    acc[s.key] = isDark ? s.dark : s.light;
    return acc;
  }, {});
}

// --- Formatters ------------------------------------------------------------

export function formatCompact(value) {
  if (!Number.isFinite(Number(value))) return "0";
  return new Intl.NumberFormat(undefined, {
    notation: "compact",
    maximumFractionDigits: 1,
  }).format(Number(value));
}

export function formatNumber(value) {
  if (!Number.isFinite(Number(value))) return "0";
  return new Intl.NumberFormat().format(Number(value));
}

export function formatPercent(fraction, digits = 1) {
  if (!Number.isFinite(Number(fraction))) return "0%";
  return `${(Number(fraction) * 100).toFixed(digits)}%`;
}

export function formatBytes(bytes) {
  const n = Number(bytes);
  if (!Number.isFinite(n) || n <= 0) return "0 B";
  const units = ["B", "KB", "MB", "GB", "TB"];
  const i = Math.min(
    units.length - 1,
    Math.floor(Math.log(n) / Math.log(1024)),
  );
  return `${(n / 1024 ** i).toFixed(i === 0 ? 0 : 1)} ${units[i]}`;
}

/** Axis tick for a bucket timestamp, given the bucket width. */
export function formatBucketTick(ms, bucketMs) {
  const date = new Date(Number(ms));
  if (Number.isNaN(date.getTime())) return "";
  if (bucketMs < 60 * 60 * 1000) {
    return date.toLocaleTimeString(undefined, {
      hour: "2-digit",
      minute: "2-digit",
    });
  }
  if (bucketMs < 24 * 60 * 60 * 1000) {
    return date.toLocaleTimeString(undefined, {
      hour: "2-digit",
      minute: "2-digit",
    });
  }
  return date.toLocaleDateString(undefined, { month: "short", day: "numeric" });
}

export function formatFullTimestamp(ms) {
  const date = new Date(Number(ms));
  if (Number.isNaN(date.getTime())) return "—";
  return date.toLocaleString(undefined, {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
}

// Options go up to 7 days, matching DRAIN_RETENTION_HOURS (see
// lib/store-redis.js). Longer-range traffic is read from the daily rollup
// instead — see components/semantic/dailyHistoryPanel.
export const TIME_RANGES = [
  { key: "1h", label: "1 hour", hours: 1 },
  { key: "6h", label: "6 hours", hours: 6 },
  { key: "24h", label: "24 hours", hours: 24 },
  { key: "7d", label: "7 days", hours: 24 * 7 },
];
