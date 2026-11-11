import { Link, Popper, Typography } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import { Box, Container } from "@mui/system";
import { useState } from "react";
import StickyMenu from "../../components/semantic/menu";
import SiteHeader from "../../components/siteHeader";
import Footer from "../../components/semantic/footer";
import { useLocale, useT } from "../../lib/i18n";
import { localizedPath } from "../../lib/i18n-config";

function Imprint() {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popper" : undefined;

  const t = useT().imprint;
  const locale = useLocale();
  // MUI Link renders a plain <a>, which doesn't add the locale prefix.
  const contactHref = localizedPath("/contact", locale);
  const websiteUrl = "https://www.global-warming.org/imprint";

  return (
    <>
      <SiteHeader
        description={t.meta.description}
        title={t.meta.title}
        keywords={t.meta.keywords}
        websiteUrl={websiteUrl}
      />
      <StickyMenu />
      <Grid container>
        <Container>
          <Typography
            component="h2"
            align="left"
            className="about-title"
            mb={5}
          >
            {t.heading}
          </Typography>
          <Typography component="p" mb={4}>
            Climate Accountability API gUG (haftungsbeschränkt)
          </Typography>
          <Typography component="p">Seestraße 107</Typography>
          <Typography component="p">13353 Berlin</Typography>
          <Typography component="p" mb={4}>
            {t.country}
          </Typography>
          <Container component="div" className="imprint" disableGutters>
            <Typography component="p">
              {t.email}{" "}
              <Typography component="span">help@global-warming.org</Typography>
            </Typography>
            <Typography component="div">
              {t.phone}{" "}
              <button aria-describedby={id} type="button" onClick={handleClick}>
                {t.showNumber}
              </button>
              <Popper id={id} open={open} anchorEl={anchorEl}>
                <Box sx={{ border: 1, p: 1, bgcolor: "white" }}>
                  0 &#49;&#53;&#50;&#48; &#50;&#52;&#49;&#56;&#51;&#48;&#49;
                </Box>
              </Popper>
            </Typography>
            <Typography component="p" mb={4}>
              {t.contactForm} <Link href={contactHref}>{t.contactLink}</Link>
            </Typography>
            <Typography component="p">
              {t.registerNumber}{" "}
              <Typography component="span">HRB 262202 B</Typography>
            </Typography>
            <Typography component="p">
              {t.register}{" "}
              <Typography component="span">{t.registerValue}</Typography>
            </Typography>
            <Typography component="p" mb={4}>
              {t.court}{" "}
              <Typography component="span">
                Amtsgericht Charlottenburg
              </Typography>
            </Typography>
            <Typography component="p">
              {t.vat}{" "}
              <Typography component="span">
                {t.vatValue}
              </Typography>
            </Typography>
            <Typography component="p" mb={5}>
              {t.representedBy}{" "}
              <Typography component="span">René Rodríguez</Typography>
            </Typography>
          </Container>
          <Container disableGutters className="second-imprint">
            <Typography component="h3" mb={2}>
              {t.disputeHeading}
            </Typography>
            <Typography component="p" mb={5}>
              {t.disputeText}
            </Typography>
          </Container>
        </Container>
      </Grid>
      <Footer classNameProp="footer" />
    </>
  );
}

export default Imprint;
