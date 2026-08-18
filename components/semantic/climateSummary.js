// components/semantic/climateSummary/climateSummary.js
//
// The landing-page synthesis panel: six stat tiles, one per API.

import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Skeleton from "@mui/material/Skeleton";
import Grid from "@mui/material/Unstable_Grid2";

import ThermostatIcon from "@mui/icons-material/Thermostat";
import CloudIcon from "@mui/icons-material/Cloud";
import LocalFireDepartmentIcon from "@mui/icons-material/LocalFireDepartment";
import ScienceIcon from "@mui/icons-material/Science";
import AcUnitIcon from "@mui/icons-material/AcUnit";
import WavesIcon from "@mui/icons-material/Waves";

const ACCENT = "#3987e5"; // validated against a dark surface
const INK_PRIMARY = "#ffffff";
const INK_SECONDARY = "rgba(255, 255, 255, 0.78)";
const INK_MUTED = "rgba(255, 255, 255, 0.58)";
const SCRIM = "rgba(13, 13, 13, 0.62)";
const HAIRLINE = "rgba(255, 255, 255, 0.14)";

const ICONS = {
  temperature: ThermostatIcon,
  co2: CloudIcon,
  methane: LocalFireDepartmentIcon,
  nitrous: ScienceIcon,
  seaIce: AcUnitIcon,
  ocean: WavesIcon,
};

/** Thousands separators, at most two decimals. */
function formatValue(value) {
  if (typeof value !== "number" || !Number.isFinite(value)) return "—";
  return value.toLocaleString("en-US", { maximumFractionDigits: 2 });
}

function comparisonText({ comparison, baselineLabel }) {
  if (comparison === null || comparison === undefined) return baselineLabel;
  const arrow = comparison >= 0 ? "▲" : "▼";
  return `${arrow} ${Math.abs(comparison)}% ${baselineLabel}`;
}

function StatTile({ indicator }) {
  const Icon = ICONS[indicator.key] ?? ScienceIcon;
  let iconColor = `${
    indicator.key === "temperature"
      ? "D5174E"
      : indicator.key === "co2"
      ? "FA4224"
      : indicator.key === "methane"
      ? "F9A825"
      : indicator.key === "nitrous"
      ? "8E24AA"
      : indicator.key === "seaIce"
      ? "C6FCFF"
      : indicator.key === "ocean"
      ? "03719C"
      : "FFFFFF"
  }`;

  return (
    <Box
      sx={{
        height: "100%",
        px: 2,
        py: 1.75,
        borderRadius: 2,
        background: SCRIM,
        border: `1px solid ${HAIRLINE}`,
        backdropFilter: "blur(6px)",
        textAlign: "left",
        display: "flex",
        flexDirection: "column",
        gap: 0.5,
        minWidth: 0,
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "flex-start",
          gap: 0.75,
          minHeight: { xs: 34, sm: 20 },
        }}
      >
        {/* Decorative: the label carries the meaning, so it's hidden from
            screen readers rather than announced as "thermostat". */}
        <Icon
          aria-hidden="true"
          sx={{
            fontSize: 20,
            color: `#${iconColor}`,
            mt: "-1px",
            flex: "none",
          }}
        />
        <Typography
          component="h3"
          sx={{
            fontSize: 13,
            fontWeight: 500,
            letterSpacing: 0.2,
            color: INK_SECONDARY,
            margin: 0,
          }}
        >
          {indicator.label}
        </Typography>
      </Box>

      <Box sx={{ display: "flex", alignItems: "baseline", gap: 0.5 }}>
        <Typography
          component="p"
          sx={{
            fontSize: { xs: 26, sm: 28 },
            fontWeight: 600,
            lineHeight: 1.1,
            color: INK_PRIMARY,
            margin: 0,
          }}
        >
          {indicator.valuePrefix ?? ""}
          {formatValue(indicator.value)}
        </Typography>
        <Typography
          component="span"
          sx={{ fontSize: 13, fontWeight: 500, color: INK_SECONDARY }}
        >
          {indicator.unit}
        </Typography>
      </Box>

      <Typography
        component="p"
        sx={{ fontSize: 12.5, lineHeight: 1.35, color: INK_SECONDARY, m: 0 }}
      >
        {comparisonText(indicator)}
      </Typography>

      {indicator.asOf && (
        <Typography
          component="p"
          sx={{ fontSize: 11.5, color: INK_MUTED, mt: "auto", pt: 0.5, m: 0 }}
        >
          {indicator.asOf}
        </Typography>
      )}
    </Box>
  );
}

StatTile.propTypes = {
  indicator: PropTypes.shape({
    key: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    value: PropTypes.number,
    unit: PropTypes.string,
    valuePrefix: PropTypes.string,
    comparison: PropTypes.number,
    baselineLabel: PropTypes.string,
    asOf: PropTypes.string,
  }).isRequired,
};

function ClimateSummary({ initialData }) {
  const [data, setData] = useState(initialData);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    // Already served with the page (getStaticProps): nothing to fetch.
    if (initialData) return undefined;

    let cancelled = false;

    // One retry, then give up.

    const load = (attempt = 0) => {
      fetch("/api/summary")
        .then((res) =>
          res.ok ? res.json() : Promise.reject(new Error(res.status)),
        )
        .then((json) => {
          if (!cancelled) setData(json);
        })
        .catch(() => {
          if (cancelled) return; // unmounted or navigated away: not a failure
          if (attempt < 1) {
            setTimeout(() => {
              if (!cancelled) load(attempt + 1);
            }, 1500);
            return;
          }
          setFailed(true);
        });
    };

    load();

    return () => {
      cancelled = true;
    };
  }, [initialData]);

  // A hero section is the wrong place for an error message. If the payload never
  // arrives, the panel simply isn't there — the page still reads as designed.
  if (failed) return null;

  const indicators = data?.indicators ?? [];
  const loading = !data;

  return (
    <Grid
      container
      spacing={1.5}
      justifyContent="center"
      sx={{
        width: "100%",
        maxWidth: 980,
        mx: "auto",
        px: 2,
        mt: { xs: 3, md: 4 },
      }}
      component="section"
      aria-label="Current climate indicators"
    >
      {loading
        ? // Six placeholders at the tiles' real height, so the hero doesn't jump
          // when the numbers land.
          Array.from({ length: 6 }, (_, i) => (
            <Grid key={`skeleton-${i}`} xs={6} sm={4}>
              <Skeleton
                variant="rounded"
                // Matched to the measured tile heights so the hero does not jump
                // when the numbers land: 157px at two-up, 126px at three-up.
                sx={{
                  bgcolor: "rgba(255,255,255,0.09)",
                  height: { xs: 157, sm: 126 },
                }}
              />
            </Grid>
          ))
        : indicators.map((indicator) => (
            <Grid key={indicator.key} mt={4} xs={6} sm={4} md={4}>
              {console.log(indicator)}
              <StatTile indicator={indicator} />
            </Grid>
          ))}
    </Grid>
  );
}

const indicatorShape = PropTypes.shape({
  key: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  value: PropTypes.number,
  unit: PropTypes.string,
  valuePrefix: PropTypes.string,
  comparison: PropTypes.number,
  baselineLabel: PropTypes.string,
  asOf: PropTypes.string,
});

ClimateSummary.propTypes = {
  initialData: PropTypes.shape({
    indicators: PropTypes.arrayOf(indicatorShape),
  }),
};

ClimateSummary.defaultProps = { initialData: null };

export default ClimateSummary;
