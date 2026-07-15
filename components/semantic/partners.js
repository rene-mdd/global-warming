"use client";

import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Unstable_Grid2"; // Grid version 2
import Item from "@mui/material/Unstable_Grid2"; // Grid version 2

// import Grid from "@mui/material/Unstable_Grid2";

export default function Partners() {
  return (
    <>
      <Typography
        gutterBottom
        className="partners-title"
        variant="h2"
        component="div"
        align="center"
      >
        Partners & Supporters
      </Typography>
      <Grid container spacing={6} justifyContent="center">
        <Grid size={3}>
          <Card sx={{ paddingLeft: 1, paddingRight: 1, maxWidth: "230px" }}>
            <CardMedia
              image="/images/eon-stiftung-logo.jpg"
              className="eon-image"
              title="eon winners"
            />
            <CardContent sx={{ padding: "13px" }}>
              <Typography gutterBottom variant="h5" component="div">
                Award - Supporter
              </Typography>
              <Typography variant="p" size="large">
                Winners of E.ON European Climate Fund Competition
              </Typography>
            </CardContent>
            <CardActions>
              <Button
                size="small"
                href="https://www.eon-foundation.com/en/solutions/european-climate-fund-2025/ecf-projects-2024.html"
              >
                Learn More
              </Button>
            </CardActions>
          </Card>
        </Grid>
        <Grid size={3}>
          <Card sx={{ paddingLeft: 1, paddingRight: 1, maxWidth: "230px" }}>
            <CardMedia
              image="/images/binda-consulting-logo.png"
              className="eon-image"
              title="binda consulting"
            />
            <CardContent sx={{ padding: "13px" }}>
              <Typography gutterBottom variant="h5" component="div">
                Partner
              </Typography>
              <Typography variant="p" size="large">
                Joined as a consortium member of CLIMACT
              </Typography>
            </CardContent>
            <CardActions>
              <Button
                size="small"
                href="https://bindaconsulting.org/"
              >
                Learn More
              </Button>
            </CardActions>
          </Card>
        </Grid>
        <Grid size={3}>
          <Card sx={{ paddingLeft: 1, paddingRight: 1, maxWidth: "230px" }}>
            <CardMedia
              image="/images/ontec-energy.png"
              className="eon-image"
              title="Ontec Energy"
              sx={{ width: "150px", margin: "auto" }}
            />
            <CardContent sx={{ padding: "13px" }}>
              <Typography gutterBottom variant="h5" component="div">
                Partner
              </Typography>
              <Typography variant="p" size="large">
                Supporting Climate Accountability API work
              </Typography>
            </CardContent>
            <CardActions>
              <Button
                size="small"
                href="https://ontecenergy.com/"
              >
                Learn More
              </Button>
            </CardActions>
          </Card>
        </Grid>
        <Grid size={3}>
          <Card sx={{ paddingLeft: 1, paddingRight: 1, maxWidth: "230px" }}>
            <CardMedia
              image="/images/roi-logo.png"
              className="eon-image"
              title="Roots of Impact"
              sx={{ width: "150px", margin: "auto" }}
            />
            <CardContent sx={{ padding: "13px" }}>
              <Typography gutterBottom variant="h5" component="div">
                Partner
              </Typography>
              <Typography variant="p" size="large">
                Supporting Climate Accountability API work
              </Typography>
            </CardContent>
            <CardActions>
              <Button
                size="small"
                href="https://roots-of-impact.org/"
              >
                Learn More
              </Button>
            </CardActions>
          </Card>
        </Grid>
      </Grid>
    </>
  );
}
