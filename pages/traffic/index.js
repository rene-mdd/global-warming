import { createTheme, ThemeProvider } from "@mui/material/styles";
import Grid from "@mui/material/Unstable_Grid2";
import StickyMenu from "../../components/semantic/menu";
import SiteHeader from "../../components/siteHeader";
import Footer from "../../components/semantic/footer";
import TrafficDashboard from "../../components/semantic/trafficDashboard/trafficDashboard";

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

function Traffic() {
  const donateTitle = "Climate Accountability API - Donate";
  const donateMetaDescription =
    "Our mission is to provide the public with information related to every organization carbon footprint";
  const donateKeywords =
    "Global warming, about, carbon footprint, climate change, environment";
  const websiteUrl = "https://www.global-warming.org/donate";

  return (
    <>
      <SiteHeader
        description={donateTitle}
        title={donateMetaDescription}
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
    <TrafficDashboard />
      </Grid>
      <ThemeProvider theme={theme}>
        <Footer classNameProp="about-footer" />
      </ThemeProvider>
    </>
  );
}

export default Traffic;
