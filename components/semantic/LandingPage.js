/* eslint-disable */
import {
  CardMedia,
  Typography,
  Button,
} from "@mui/material";
import Grid from '@mui/material/Unstable_Grid2'; // Grid version 2
import * as Scroll from "react-scroll";

const LandingPage = () => (
  <Grid
    container
    justifyContent="center"
    direction="column"
    className="landing-background"
  >
    <Typography component="h1" align="center" className="h1-landing">
      Global Warming and Climate Change API
    </Typography>
    <Grid xs={12} align="center">
      <CardMedia
        component="img"
        image="images/icons8-stocks-64.png"
        className="landing-page-logo"
        alt="green energy"
      />
      <Typography align="center" className="h2-landing" maxWidth="80%">
        This page delivers up to date APIs, graph, and information about the
        earth&quot;s current temperature and the concentration of greenhouse gases (GHG)
        in the atmosphere.
      </Typography>
    </Grid>
    <Grid xs={12} align="center" sx={{ marginTop: "auto", marginBottom: "10px" }}>
      <Scroll.Link spy smooth duration={1000} to="jump-to-temperature">
        <Button className="icon-style">
          <CardMedia
            image="/images/icons-double-down-white.png"
            component="img"
            className="down-icon"
            alt="move to next section"
          />
        </Button>
      </Scroll.Link>
    </Grid>
  </Grid>
);

export default LandingPage;
