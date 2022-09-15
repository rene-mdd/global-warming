/* eslint-disable */
import * as Scroll from "react-scroll";
import { CardMedia, Grid, Typography, Button, Divider } from "@mui/material";
import StickyMenu from "../../components/semantic/menu";
import SiteHeader from "../../components/siteHeader";
import Team from "../../components/semantic/team";
import CustomizedTimeline from "../../components/semantic/customized-timeline";
import aboutData from "../../public/SSG/about.json"

function About(props) {
  const {
    aboutData: {
      aboutTitle,
      aboutMetaDescription,
      aboutKeywords,
      pageTitle,
      subTitle,
      timelineTitle,
    },
  } = props;

  return (
    <>
      <SiteHeader
        description={aboutMetaDescription}
        title={aboutTitle}
        keywords={aboutKeywords}
      />
      <StickyMenu />
      <Grid
        container
        direction="column"
        justifyContent="center"
        className="landing-page-about"
      >
        <Typography paragraph align="center" className="h1-about">
          {pageTitle}
        </Typography>
        <Grid align="center">
          <CardMedia
            component="img"
            image="images/logo-planet-image.png"
            className="landing-page-logo"
            alt="planet dying logo"
          />
          <Typography
            component="h2"
            className="h2-landing-about"
            align="center"
            gutterBottom
          >
            {subTitle}
          </Typography>
        </Grid>
        <Grid component="div" container justifyContent="center">
          <Grid item>
            <iframe
              title="Tons of CO2 emitted into the atmosphere"
              src="https://www.theworldcounts.com/embed/challenges/23?background_color=#ffffff&color=black&font_family=%22Helvetica+Neue%22%2C+Arial%2C+sans-serif&font_size=14"
              style={{ border: "none", width: "100%" }}
              height="125"
              width="300"
              loading="lazy"
            ></iframe>
          </Grid>
          <Grid item>
            <iframe
              title="World average temperature (°C)"
              src="https://www.theworldcounts.com/embed/challenges/21?background_color=#ffffff&color=black&font_family=%22Helvetica+Neue%22%2C+Arial%2C+sans-serif&font_size=14"
              style={{ border: "none", width: "100%" }}
              height="125"
              width="300"
              loading="lazy"
            ></iframe>
          </Grid>
        </Grid>
        <Grid align="center" sx={{ marginTop: "auto", marginBottom: "10px" }}>
          <Scroll.Link spy smooth duration={1000} to="jump-news" Ref="nofollow">
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
      <Divider name="jump-news" className="hide-divider" />
      <Grid container className="timeline">
        <Typography variant="h2" className="timeline-title">
          {timelineTitle}
        </Typography>
        <CustomizedTimeline />
      </Grid>
      <Grid className="team-wrapper">
        <Team />
      </Grid>
    </>
  );
}

export async function getStaticProps(context) {
 
  return {
    // this data comes from SSG folder (static site generation)
    props: { aboutData },
  };
}

export default About;
