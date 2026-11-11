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
import Partners from "../../components/semantic/partners";
import Achievements from "../../components/semantic/achievements";
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

function About() {
  const t = useT().about;
  const websiteUrl = "https://global-warming.org/about";
  return (
    <>
      <SiteHeader
        description={t.meta.description}
        title={t.meta.title}
        keywords={t.meta.keywords}
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
          {t.hero.title}
        </Typography>
        <Grid size="grow" align="center">
          <CardMedia
            component="img"
            image="/images/logo-planet-image.png"
            className="landing-page-logo"
            alt={t.hero.logoAlt}
          />
          <Typography
            component="h1"
            className="h2-landing-about"
            align="center"
            gutterBottom
          >
            {t.hero.intro.before}
            <strong>{t.hero.intro.name}</strong>
            {t.hero.intro.after}
          </Typography>
        </Grid>
        <Grid align="center" sx={{ marginTop: "auto", marginBottom: "10px" }}>
          <Scroll.Link spy smooth duration={1000} to="jump-news">
            <Button className="down-icon-wrapper">
              <CardMedia
                image="/images/icons-double-down.png"
                component="img"
                className="down-icon"
                alt={t.hero.scrollAlt}
              />
            </Button>
          </Scroll.Link>
        </Grid>
      </Grid>
      <Divider className="hide-divider" />
      <Divider name="jump-news" className="hide-divider" />
      <Grid className="timeline" id="project-timeline">
        <CustomizedTimeline />
      </Grid>
      <Grid container>
        <Achievements />
      </Grid>
      <Grid className="about-wrapper" id="team">
        <Team />
      </Grid>
      <Grid
        className="partners-wrapper"
        alignItems="center"
        justifyContent="center"
      >
        <Partners />
      </Grid>
      <Grid
        container
        className="transparency-wrapper"
        id="transparency"
        justifyContent="center"
      >
        <Transparency />
      </Grid>
      <Grid container className="about-wrapper">
        <Git />
      </Grid>
      <ThemeProvider theme={theme}>
        <Footer classNameProp="about-footer" />
      </ThemeProvider>
    </>
  );
}

export default About;
