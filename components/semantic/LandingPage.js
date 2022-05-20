/* eslint-disable */
import {
  CardMedia,
  Grid,
  Typography,
  Button,
} from "@mui/material";
import * as Scroll from "react-scroll";

const LandingPage = () => (
  <Grid
    container
    direction="column"
    justifyContent="center"
    className="landing-background"
    columns={12}
  >
    <Typography component="h1" align="center" className="h1-news">
      Global Warming live graphs and API
    </Typography>
    <Grid align="center">

      <CardMedia
        component="img"
        image="images/icons8-stocks-64.png"
        className="forest-logo"
      />
      <Typography align="center" className="h2-id" maxWidth="80%">
        This site delivers up to date information and APIs about the
        earth&quot;s current temperature, the concentration of greenhouse gases
        in the atmosphere, and worldwide news about global warming and
        deforestation.
      </Typography>
    </Grid>
    <Grid align="center" sx={{ marginTop: "auto", marginBottom: "10px" }}>
      <Scroll.Link spy smooth duration={1000} to="jump-to-temperature">
        <Button className="icon-style" basic>
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
);

export default LandingPage;
