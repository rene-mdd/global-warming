/* eslint-disable */
import * as Scroll from "react-scroll";
import {
  Container,
  CardMedia,
  Grid,
  Typography,
  Button,
  Divider,
} from "@mui/material";
import StickyMenu from "../../components/semantic/menu";
import SiteHeader from "../../components/siteHeader";
import Team from "../../components/semantic/team";
import CustomizedTimeline from "../../components/semantic/customized-timeline";

function About() {
  // not ready

  // not ready
  const aboutTitle = "Global deforestation news and map.";
  const aboutMetaDescription =
    "Live news about worldwide deforestation and map builder to check on global forest loss.";
  const aboutKeywords =
    "Deforestation, global warming, climate change, environment";

  return (
    <>
      <SiteHeader
        description={aboutTitle}
        title={aboutMetaDescription}
        keywords={aboutKeywords}
      />
      <StickyMenu />
      <Grid
        container
        direction="column"
        justifyContent="center"
        className="landing-page-about"
      >
        <Typography component="h1" align="center" className="h1-about">
          About Us
        </Typography>
        <Grid align="center">
          <CardMedia
            component="img"
            image="images/logo-planet-image.png"
            className="landing-page-logo"
          />
          <Typography
            component="h2"
            className="h2-landing-about"
            align="center"
          >
            We aim to be the most complete and reliable platform for worldwide
            environmental accountability.
          </Typography>
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
      <Divider name="jump-news" className="hide-divider" />
      <Grid container className="timeline">
        <Typography variant="h2" className="timeline-title">
          Project Timeline
        </Typography>
        <CustomizedTimeline />
      </Grid>
      <Grid>
        <Team />
      </Grid>
    </>
  );
}

export default About;
