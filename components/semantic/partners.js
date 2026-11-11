"use client";

import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useT } from "../../lib/i18n";

export default function Partners() {
  const t = useT().about.partners;
  return (
    <>
      <Typography
        gutterBottom
        className="partners-title"
        variant="h2"
        component="h2"
        align="center"
      >
        {t.title}
      </Typography>

      <div className="partners-cards-wrapper">
        <Card className="partner-card" sx={{ paddingLeft: 1, paddingRight: 1 }}>
          <CardMedia
            image="/images/eon-stiftung-logo.jpg"
            className="supporters-image"
            title={t.eonImageTitle}
          />
          <CardContent sx={{ padding: "13px" }}>
            <Typography gutterBottom variant="h5" component="div">
              E.ON
            </Typography>
            <Typography variant="p" size="large">
              {t.eon}
            </Typography>
          </CardContent>
          <CardActions>
            <Button
              size="small"
              href="https://www.eon-foundation.com/en/solutions/european-climate-fund-2025/ecf-projects-2024.html"
            >
              {t.learnMore}
            </Button>
          </CardActions>
        </Card>
        <Card className="partner-card" sx={{ paddingLeft: 1, paddingRight: 1 }}>
          <CardMedia
            image="/images/binda-consulting-logo.png"
            className="supporters-image"
            title="binda consulting"
          />
          <CardContent sx={{ padding: "13px" }}>
            <Typography gutterBottom variant="h5" component="div">
              BCI
            </Typography>
            <Typography variant="p" size="large">
              {t.bci}
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="small" href="https://bindaconsulting.org/">
              {t.learnMore}
            </Button>
          </CardActions>
        </Card>
        <Card className="partner-card" sx={{ paddingLeft: 1, paddingRight: 1 }}>
          <CardMedia
            image="/images/ontec-energy.png"
            className="supporters-image"
            title="Ontec Energy"
            sx={{ width: "150px", margin: "auto" }}
          />
          <CardContent sx={{ padding: "13px" }}>
            <Typography gutterBottom variant="h5" component="div">
              Ontec Energy
            </Typography>
            <Typography variant="p" size="large">
              {t.ontec}
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="small" href="https://ontecenergy.com/">
              {t.learnMore}
            </Button>
          </CardActions>
        </Card>
        <Card className="partner-card" sx={{ paddingLeft: 1, paddingRight: 1 }}>
          <CardMedia
            image="/images/roi-logo.png"
            className="supporters-image"
            title="Roots of Impact"
            sx={{ width: "150px", margin: "auto" }}
          />
          <CardContent sx={{ padding: "13px" }}>
            <Typography gutterBottom variant="h5" component="div">
              Roots of Impact
            </Typography>
            <Typography variant="p" size="large">
              {t.roots}
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="small" href="https://roots-of-impact.org/">
              {t.learnMore}
            </Button>
          </CardActions>
        </Card>
        <Card className="partner-card" sx={{ paddingLeft: 1, paddingRight: 1 }}>
          <CardMedia
            image="/images/upf.webp"
            className="supporters-image"
            title="UPF"
            sx={{ width: "150px", margin: "auto" }}
          />
          <CardContent sx={{ padding: "13px" }}>
            <Typography gutterBottom variant="h5" component="div">
              Pompeu Fabra University (UPF)
            </Typography>
            <Typography variant="p" size="large">
              {t.upf}
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="small" href="https://www.upf.edu/en/">
              {t.learnMore}
            </Button>
          </CardActions>
        </Card>
      </div>
    </>
  );
}
