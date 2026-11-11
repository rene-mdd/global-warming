import { CardMedia, Typography, Button } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2"; // Grid version 2
import * as Scroll from "react-scroll";
import ClimateSummary from "./climateSummary";
import { useT } from "../../lib/i18n";

const LandingPage = () => {
  const t = useT().landing;
  return (
    <Grid
      container
      justifyContent="center"
      direction="column"
      className="landing-background"
    >
      <Typography component="h1" align="center" className="h1-landing">
        {t.h1}
      </Typography>
      <Grid xs={12} align="center">
        <CardMedia
          component="img"
          image="/images/icons8-stocks-64.png"
          className="landing-page-logo"
          alt={t.logoAlt}
        />
        <Typography align="center" className="h2-landing" maxWidth="80%">
          {t.intro}
        </Typography>
      </Grid>
      <Grid container>
        <ClimateSummary />
      </Grid>
      <Grid
        xs={12}
        align="center"
        sx={{ marginTop: "auto", paddingTop: "50px" }}
        mb={1}
      >
        <Scroll.Link spy smooth duration={1000} to="jump-to-temperature">
          <Button className="icon-style">
            <CardMedia
              image="/images/icons-double-down-white.png"
              component="img"
              className="down-icon"
              alt={t.scrollAlt}
            />
          </Button>
        </Scroll.Link>
      </Grid>
    </Grid>
  );
};

export default LandingPage;
