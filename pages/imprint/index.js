import * as Scroll from "react-scroll";
import { Divider, Link, Typography } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import StickyMenu from "../../components/semantic/menu";
import SiteHeader from "../../components/siteHeader";
import Footer from "../../components/semantic/footer";
import { Container } from "@mui/system";

function Imprint() {

  const imprintTitle = "Climate Accountability API - Imprint";
  const imprintMetaDescription =
    "Climate Accountability API gUG. Berlin, Germany.";
  const imprintKeywords =
    "Global warming, about, carbon footprint, climate change, environment";
  return (
    <>
      <SiteHeader
        description={imprintMetaDescription}
        title={imprintTitle}
        keywords={imprintKeywords}
      />
      <StickyMenu />
      <Grid
        container

      >
        <Container>
          <Typography component="h2" align="left" className="about-title" mb={5}>
            Imprint
          </Typography>
          <Typography component="p" mb={4}>
            Climate Accountability API
          </Typography>
          <Typography component="p">
            Seestraße 107,
          </Typography>
          <Typography component="p">
            13353 Berlin,
          </Typography>
          <Typography component="p" mb={4}>
            Deutschland
          </Typography>
          <Container component="div" className="imprint" disableGutters>
            <Typography component="p">
              Email: <Typography component="span">info@global-warming.org</Typography>
            </Typography>
            <Typography component="p" mb={4}>
              Contact form: <Link href="/contact">Contact</Link>
            </Typography>
            <Typography component="p">
              Register: <Typography component="span">Handelsregister</Typography>
            </Typography>
            <Typography component="p">
              Registernummer: <Typography component="span">HRB 262202 B</Typography>
            </Typography>
            <Typography component="p" mb={4}>
              Registergericht: <Typography component="span">Charlottenburg</Typography>
            </Typography>
            <Typography component="p">
              UID-Nummer: <Typography component="span">DE123456789</Typography>
            </Typography>
            <Typography component="p">
              Professional title: <Typography component="span">Software development, Data engineering</Typography>
            </Typography>
            <Typography component="p" mb={4}>
              Awarding country: <Typography component="span">Germany</Typography>
            </Typography>
            <Typography component="p" mb={4}>
              Managing director: <Typography component="span">René Rodríguez</Typography>
            </Typography>
            <Typography component="p" mb={5}>
              Imprint of the data protection authority: <Typography component="span">https://global-warming.org/imprint</Typography>
            </Typography>
          </Container>
          <Container disableGutters className="second-imprint">
            <Typography component="h3" mb={4}>
              Universalschlichtungsstelle
            </Typography>
            <Typography component="p">
              <Typography component="span">We are willing to participate in dispute resolution procedures before the following consumer arbitration board:</Typography>
            </Typography>
            <Typography component="p">
              <Typography component="span">Universalschlichtungsstelle des Bundes am Zentrum für Schlichtung e.V. Straßburger Straße 8
                77694 Kehl, Germany
                <Link href="https://www.universalschlichtungsstelle.de/"> (www.universalschlichtungsstelle.de)</Link></Typography>
            </Typography>
            <Typography component="h3" mt={4} mb={4}>
              EU-Streitschlichtung
            </Typography>
            <Typography component="p" mb={5}>
              <Typography component="span">In the event of a dispute, consumers have the option to use the European Online Dispute Resolution (ODR) platform. You can access the platform at the following link:
                <Link href="https://ec.europa.eu/consumers/odr/main/index.cfm?event=main.home.chooseLanguage"> (EU Online Dispute Resolution Platform)</Link></Typography>
            </Typography>
          </Container>
        </Container>
      </Grid>
      <Footer props="footer" />
    </>
  );
}

export default Imprint;