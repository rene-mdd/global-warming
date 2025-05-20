import * as Scroll from "react-scroll";
import { CardMedia, Typography, Button, Divider } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Grid from "@mui/material/Unstable_Grid2";
import StickyMenu from "../../components/semantic/menu";
import SiteHeader from "../../components/siteHeader";
import Team from "../../components/semantic/team";
import CustomizedTimeline from "../../components/semantic/customized-timeline";
import Git from "../../components/semantic/git";
import Footer from "../../components/semantic/footer";
import Transparency from "../../components/semantic/transparency";

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

function About() {
  const aboutTitle = "Climate Accountability API - About Us";
  const websiteUrl = "https://global-warming.org/about";
  const aboutMetaDescription =
    "Our mission is to provide the public with information related to every organization carbon footprint";
  const aboutKeywords =
    "Global warming, about, carbon footprint, climate change, environment";
  return (
    <>
      <SiteHeader
        description={aboutMetaDescription}
        title={aboutTitle}
        keywords={aboutKeywords}
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
          About Us
        </Typography>
        <Grid align="center">
          <CardMedia
            component="img"
            image="images/logo-planet-image.png"
            className="landing-page-logo"
            alt="planet dying logo"
          />
          <Typography
            component="h1"
            className="h2-landing-about"
            align="center"
            gutterBottom
          >
            At <strong>Climate Accountability API</strong>, We are building the
            most comprehensive platform for business environmental impact data.
          </Typography>
        </Grid>
        <Grid component="div" container justifyContent="center">
          <Grid>
            <iframe
              title="Tons of CO2 emitted into the atmosphere"
              src="https://www.theworldcounts.com/embed/challenges/23?background_color=#ffffff&color=black&font_family=%22Helvetica+Neue%22%2C+Arial%2C+sans-serif&font_size=14"
              style={{ border: "none", width: "100%" }}
              height="125"
              width="300"
              loading="lazy"
            />
          </Grid>
          <Grid>
            <iframe
              title="World average temperature (°C)"
              src="https://www.theworldcounts.com/embed/challenges/21?background_color=#ffffff&color=black&font_family=%22Helvetica+Neue%22%2C+Arial%2C+sans-serif&font_size=14"
              style={{ border: "none", width: "100%" }}
              height="125"
              width="300"
              loading="lazy"
            />
          </Grid>
        </Grid>
        <Grid align="center" sx={{ marginTop: "auto", marginBottom: "10px" }}>
          <Scroll.Link spy smooth duration={1000} to="jump-news">
            <Button className="down-icon-wrapper">
              <CardMedia
                image="/images/icons-double-down.png"
                component="img"
                className="down-icon"
                alt="move to next section"
              />
            </Button>
          </Scroll.Link>
        </Grid>
      </Grid>
      <Divider className="hide-divider" />
      <Divider name="jump-news" className="hide-divider" />
      <Grid container className="timeline" id="project-timeline">
        <Typography variant="h2" className="timeline-title">
          Project Timeline
        </Typography>
        <CustomizedTimeline />
      </Grid>
      <Grid container className="transparency-wrapper" id="transparency">
        <Typography variant="h2" className="transparency-title" align="center">
          Transparency
        </Typography>
        <Transparency />
      </Grid>
      <Divider sx={{ borderColor: "#adadad" }} />
      <Grid container className="team-wrapper">
        <Grid xs={12}>
          <Team />
        </Grid>
      </Grid>
      <Grid container className="team-wrapper">
        <Grid xs={12}>
          <Git />
        </Grid>
      </Grid>
      <ThemeProvider theme={theme}>
        <Footer classNameProp="about-footer" />
      </ThemeProvider>
    </>
  );
}

export default About;
