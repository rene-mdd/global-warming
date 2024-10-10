import { createTheme, ThemeProvider } from "@mui/material/styles";
import Grid from "@mui/material/Unstable_Grid2";
import { Typography } from "@mui/material";
import { Container } from "@mui/system";
import StickyMenu from "../../components/semantic/menu";
import SiteHeader from "../../components/siteHeader";
import Footer from "../../components/semantic/footer";
import TwingleEmbed from "../../components/semantic/twigleEmbed";

const theme = createTheme({
  palette: {
    primary: {
      main: "#ffffff",
    },
    pepe: {
      main: "#343837",
    },
  },
});

function Donate() {
  const donateTitle = "Climate Accountability API - Donate";
  const donateMetaDescription =
    "Our mission is to provide the public with information related to every organization carbon footprint";
  const donateKeywords =
    "Global warming, about, carbon footprint, climate change, environment";
  return (
    <>
      <SiteHeader
        description={donateTitle}
        title={donateMetaDescription}
        keywords={donateKeywords}
      />
      <StickyMenu />
      <Grid
        container
        direction="column"
        justifyContent="center"
        className="landing-page-about"
      >
        <Typography component="p" align="center" className="about-title ">
          Donate
        </Typography>
        <TwingleEmbed />
        <Container align="center" className="donation-counter-wrapper">
          <iframe
            height="100"
            width="300"
            src="https://donationstatus.twingle.de/donation-status/lnXXrkIJqASolNwchRtiKA%253D%253D"
            title="Climate Accountability API donation counter"
          />
        </Container>
        <Container align="center">
          <Typography component="p" maxWidth={600}>
            We are a non-profit because we believe that data about the
            environmental impact of every entity should be open, free, and
            accessible to everyone.
          </Typography>
          <Typography component="p" mb={5} mt={2} maxWidth={600}>
            Transparency is essential for driving accountability and empowering
            individuals to make informed decisions that will benefit both
            society and the planet.
          </Typography>
        </Container>
      </Grid>
      <ThemeProvider theme={theme}>
        <Footer classNameProp="about-footer" />
      </ThemeProvider>
    </>
  );
}

export default Donate;
