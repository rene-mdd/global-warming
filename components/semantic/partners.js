"use client";

import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

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
        Partners & Acknowledgements
      </Typography>
      <Card sx={{ paddingLeft: 1, paddingRight: 1, maxWidth: "230px" }}>
        <CardMedia
          image="/images/eon-stiftung-logo.jpg"
          className="eon-image"
          title="eon winners"
        />
        <CardContent sx={{ padding: "13px" }}>
          <Typography gutterBottom variant="h5" component="div">
            Award
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
    </>
  );
}
