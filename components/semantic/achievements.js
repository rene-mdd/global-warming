"use client";

import { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Unstable_Grid2";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Link from "@mui/material/Link";
import { useLocale, useT } from "../../lib/i18n";
import { localizedPath } from "../../lib/i18n-config";

// Starts at the real number: it is what the server renders, so the page HTML
// that search engines and other crawlers read carries the figures instead of
// 0. The count-up from 0 runs only once `animate` is set.
function CountUp({ end, duration, showPlus, animate, numberLocale }) {
  const [count, setCount] = useState(end);

  useEffect(() => {
    if (!animate) return undefined;

    let start = 0;
    setCount(0);
    const increment = end / (duration / 16);

    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);

    return () => clearInterval(timer);
  }, [end, duration, animate]);

  return (
    <Typography
      variant="h2"
      component="div"
      sx={{ fontWeight: 700, fontSize: "2rem" }}
    >
      {showPlus ? "+" : ""}
      {count.toLocaleString(numberLocale)}
    </Typography>
  );
}

CountUp.propTypes = {
  end: PropTypes.number.isRequired,
  duration: PropTypes.number,
  showPlus: PropTypes.bool,
  animate: PropTypes.bool.isRequired,
  numberLocale: PropTypes.string.isRequired,
};

CountUp.defaultProps = {
  duration: 1200,
  showPlus: false,
};

function FactCard({ value, label, showPlus, numberLocale }) {
  const ref = useRef(null);
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    // Counts up only when the visitor scrolls the card into view. Crawlers
    // don't scroll (Google renders with a viewport stretched to the page
    // height instead), so they keep seeing the real number.
    let scrolled = false;
    const onScroll = () => {
      scrolled = true;
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && scrolled) {
        setAnimate(true);
        observer.disconnect();
      }
    }, { threshold: 0.5 });

    const el = ref.current;
    if (el) observer.observe(el);

    return () => {
      window.removeEventListener("scroll", onScroll);
      observer.disconnect();
    };
  }, []);

  return (
    <Paper
      ref={ref}
      elevation={0}
      sx={{ bgcolor: "transparent", color: "white", p: 2 }}
    >
      <CountUp
        end={value}
        showPlus={showPlus}
        animate={animate}
        numberLocale={numberLocale}
      />
      <Typography variant="h6" sx={{ mt: 1 }}>
        {label}
      </Typography>
    </Paper>
  );
}

FactCard.propTypes = {
  value: PropTypes.number.isRequired,
  label: PropTypes.string.isRequired,
  showPlus: PropTypes.bool,
  numberLocale: PropTypes.string.isRequired,
};

FactCard.defaultProps = {
  showPlus: false,
};

export default function FactsSection() {
  const t = useT().about.achievements;
  const locale = useLocale();
  const facts = [
    { value: 80000, label: t.devices, showPlus: true },
    { value: 350000, label: t.apiRequests, showPlus: true },
    { value: 149000, label: t.companies, showPlus: true },
  ];

  return (
    <Box
      component="section"
      className="achievements-section"
    >
      <Box
        sx={{ position: "absolute", inset: 0, bgcolor: "rgba(0, 0, 0, 0.69)" }}
      />

      <Container sx={{ position: "relative", zIndex: 1 }}>
        <Typography
          gutterBottom
          variant="h2"
          component="h2"
          align="center"
          className="achievements-title"
        >
          {t.title}
        </Typography>
        <Grid container spacing={4} justifyContent="center" textAlign="center">
          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <FactCard
              value={facts[0].value}
              label={facts[0].label}
              showPlus={facts[0].showPlus}
              numberLocale={t.numberLocale}
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <FactCard
              value={facts[1].value}
              label={facts[1].label}
              showPlus={facts[1].showPlus}
              numberLocale={t.numberLocale}
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <FactCard
              value={facts[2].value}
              label={facts[2].label}
              showPlus={facts[2].showPlus}
              numberLocale={t.numberLocale}
            />
          </Grid>
        </Grid>
      </Container>
      <Container align="center" sx={{ position: "relative", zIndex: 1, marginTop: "40px", marginBottom: "64px" }}>
        <Link
          underline="hover"
          // MUI Link renders a plain <a>, which doesn't add the locale prefix.
          href={localizedPath("/traffic", locale)}
          className="link-to-traffic"
        >
          {t.learnMore}
        </Link>
      </Container>
    </Box>
  );
}