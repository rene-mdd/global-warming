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
      <Card sx={{ maxWidth: 566 }}>
        <CardMedia
          image="/images/eon-stiftung-logo.jpg"
          className="eon-image"
          title="green iguana"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            Award
          </Typography>
          <Typography variant="body2">European Climate Fund Winners</Typography>
        </CardContent>
        <CardActions>
          <Button
            size="small"
            href="https://www.eon-stiftung.com/de/handeln/european-climate-fund/ecf-projects-2024.html"
          >
            Learn More
          </Button>
        </CardActions>
      </Card>
    </>
  );
}
