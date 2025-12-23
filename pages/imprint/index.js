import { Link, Popper, Typography } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import { Box, Container } from "@mui/system";
import { useState } from "react";
import StickyMenu from "../../components/semantic/menu";
import SiteHeader from "../../components/siteHeader";
import Footer from "../../components/semantic/footer";

function Imprint() {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popper" : undefined;

  const imprintTitle = "Climate Accountability API - Imprint";
  const imprintMetaDescription =
    "Imprint: Climate Accountability API gUG. Berlin, Germany.";
  const imprintKeywords =
    "Global warming, about, carbon footprint, climate change, environment";
  const websiteUrl = "https://www.global-warming.org/imprint";

  return (
    <>
      <SiteHeader
        description={imprintMetaDescription}
        title={imprintTitle}
        keywords={imprintKeywords}
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
            Imprint / Site Notice
          </Typography>
          <Typography component="p" mb={4}>
            Climate Accountability API gUG (haftungsbeschränkt)
          </Typography>
          <Typography component="p">Seestraße 107</Typography>
          <Typography component="p">13353 Berlin</Typography>
          <Typography component="p" mb={4}>
            Deutschland
          </Typography>
          <Container component="div" className="imprint" disableGutters>
            <Typography component="p">
              Email:{" "}
              <Typography component="span">info@global-warming.org</Typography>
            </Typography>
            <Typography component="div">
              Phone:{" "}
              <button aria-describedby={id} type="button" onClick={handleClick}>
                Show number
              </button>
              <Popper id={id} open={open} anchorEl={anchorEl}>
                <Box sx={{ border: 1, p: 1, bgcolor: "white" }}>
                  0 &#49;&#53;&#50;&#48; &#50;&#52;&#49;&#56;&#51;&#48;&#49;
                </Box>
              </Popper>
            </Typography>
            <Typography component="p" mb={4}>
              Contact form: <Link href="/contact">Contact</Link>
            </Typography>
            <Typography component="p">
              Commercial Register:{" "}
              <Typography component="span">HRB 262202 B</Typography>
            </Typography>
            <Typography component="p">
              Register:{" "}
              <Typography component="span">Handelsregister</Typography>
            </Typography>
            <Typography component="p" mb={4}>
              Registration court:{" "}
              <Typography component="span">
                Amtsgericht Charlottenburg
              </Typography>
            </Typography>
            <Typography component="p">
              VAT ID:{" "}
              <Typography component="span">
                Sales tax identification number according to Sect. 27 a of the
                Sales Tax Law: DE450553116
              </Typography>
            </Typography>
            <Typography component="p" mb={5}>
              Represented by:{" "}
              <Typography component="span">René Rodríguez</Typography>
            </Typography>
          </Container>
          <Container disableGutters className="second-imprint">
            <Typography component="h3" mb={2}>
              Universalschlichtungsstelle
            </Typography>
            <Typography component="p">
              <Typography component="span">
                We are willing to participate in dispute resolution procedures
                before the following consumer arbitration board:
              </Typography>
            </Typography>
            <Typography component="p">
              Universalschlichtungsstelle des Bundes am Zentrum für Schlichtung
              e.V. Straßburger Straße 8 77694 Kehl, Germany
              <Link href="https://www.universalschlichtungsstelle.de/">
                {" "}
                (www.universalschlichtungsstelle.de)
              </Link>
            </Typography>
            <Typography component="h3" mt={4} mb={2}>
              EU dispute resolution
            </Typography>
            <Typography component="p" mb={5}>
              The European Commission provides a platform for online dispute
              resolution (ODR):
              <Link href="https://ec.europa.eu/consumers/odr/">
                {" "}
                (https://ec.europa.eu/consumers/odr/)
              </Link>{" "}
              Our e-mail address can be found above in the site notice.
            </Typography>
            <Typography component="h3" mt={4} mb={2}>
              Dispute resolution proceedings in front of a consumer arbitration
              board
            </Typography>
            <Typography component="p" mb={5}>
              We participate in a dispute settlement procedure before a consumer
              arbitration board. The competent consumer arbitration board is
              Zentrum für Schlichtung e.V., Straßburger Straße 8, 77694 Kehl am
              Rhein:
              <Link href="https://www.verbraucher-schlichter.de">
                {" "}
                (https://www.verbraucher-schlichter.de).
              </Link>
            </Typography>
          </Container>
        </Container>
      </Grid>
      <Footer classNameProp="footer" />
    </>
  );
}

export default Imprint;
