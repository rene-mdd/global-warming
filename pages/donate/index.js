import { createTheme, ThemeProvider } from "@mui/material/styles";
import Grid from "@mui/material/Unstable_Grid2";
import { Typography } from "@mui/material";
import { Container } from "@mui/system";
import StickyMenu from "../../components/semantic/menu";
import SiteHeader from "../../components/siteHeader";
import Footer from "../../components/semantic/footer";
import TwingleEmbed from "../../components/semantic/twigleEmbed";
import { useT } from "../../lib/i18n";

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
  const t = useT().donate;
  const donateKeywords =
    "Global warming, about, carbon footprint, climate change, environment";
  const websiteUrl = "https://www.global-warming.org/donate";

  return (
    <>
      <SiteHeader
        description={t.meta.description}
        title={t.meta.title}
        keywords={donateKeywords}
        websiteUrl={websiteUrl}
      />
      <StickyMenu />
      <Grid
        container
        direction="column"
        justifyContent="center"
        className="landing-page-about"
      >
        <Typography component="p" align="center" className="about-title ">
          {t.heading}
        </Typography>
        <TwingleEmbed />
        {/* <Container align="center" className="donation-counter-wrapper">
          <iframe
            height="100"
            width="300"
            src="https://donationstatus.twingle.de/donation-status/lnXXrkIJqASolNwchRtiKA%253D%253D"
            title="Climate Accountability API donation counter"
          />
        </Container> */}
        <Container align="center">
          <Typography component="p" maxWidth={600}>
            {t.paragraphs[0]}
          </Typography>
          <Typography component="p" mb={5} mt={2} maxWidth={600}>
            {t.paragraphs[1]}
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
