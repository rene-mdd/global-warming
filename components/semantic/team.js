import { Container, Box, Typography, Avatar, Link } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import { useRouter } from "next/router";
import { useT } from "../../lib/i18n";
import { DEFAULT_LOCALE, linkLocale } from "../../lib/i18n-config";

export default function Team() {
  const t = useT().about.team;
  const { locale = DEFAULT_LOCALE } = useRouter();
  // A plain <a>, so the locale prefix is added by hand. Falls back to the
  // English page while /contact has no German version.
  const contactLocale = linkLocale("/contact", locale);
  const contactHref =
    contactLocale === DEFAULT_LOCALE ? "/contact" : `/${contactLocale}/contact`;
  const content = {
    badge: "GWO",
    "header-p1": t.heading,
    "description": t.description,
    "01_image": "/images/rene-picture.jpg",
    "01_name": "René Rodríguez",
    "01_job": t.jobs["01"],

    "02_image": "/images/venkat.jpg",
    "02_name": "Venkat Harshith",
    "02_job": t.jobs["02"],

    "03_image": "/images/keitel-picture.jpeg",
    "03_name": "Keitel Ortega",
    "03_job": t.jobs["03"],

    "04_image": "/images/darshan.jpeg",
    "04_name": "Darshan Parashuramappa",
    "04_job": t.jobs["04"],

    "05_image": "/images/annalisa.jpg",
    "05_name": "Annalisa Ricchiuti",
    "05_job": t.jobs["05"],

    "06_image": "/images/armin.jpeg",
    "06_name": "Armin Maddah",
    "06_job": t.jobs["06"],

    "07_image": "/images/farah.jpeg",
    "07_name": "Farah Fauth P.",
    "07_job": t.jobs["07"],

    "08_image": "/images/nina.png",
    "08_name": "Nina Nowak",
    "08_job": t.jobs["08"],

    "09_image": "/images/hailey.jpeg",
    "09_name": "Hailey Foster",
    "09_job": t.jobs["09"],

    "10_image": "/images/veronica.jpeg",
    "10_name": "Veronica Marotta",
    "10_job": t.jobs["10"],

    "11_image": "/images/empty-profile.jpeg",
    "11_name": t.openPosition,
    "11_job": t.jobs["11"],
  };

  return (
      <section>
        <Container maxWidth="lg">
          <Box pt={8} pb={12} textAlign="center">
            <Box mb={9}>
              <Container maxWidth="sm">
                {/* <Typography variant="overline" color="textSecondary" component="p">
                {content.badge}
              </Typography> */}
                <Typography
                  variant="h3"
                  component="p"
                  color="primary"
                  fontSize="1.5em"
                  gutterBottom
                >
                  {content["header-p1"]}
                </Typography>
                <Typography
                  variant="subtitle1"
                  color="textSecondary"
                  component="p"
                >
                  {content.description}
                </Typography>
              </Container>
            </Box>
            <Grid container spacing={6} justifyContent="center">
              <Grid xs={12} sm={6} md={3}>
                <Avatar
                  alt={t.pictureAlt}
                  src={content["01_image"]}
                  className="team-picture"
                />
                <Typography variant="h6" component="h6" gutterBottom>
                  {content["01_name"]}
                </Typography>
                <Typography
                  variant="body1"
                  color="textSecondary"
                  component="span"
                >
                  {content["01_job"]}
                </Typography>
              </Grid>
              <Grid xs={12} sm={6} md={3}>
                <Avatar
                  alt={t.pictureAlt}
                  src={content["02_image"]}
                  className="team-picture"
                />
                <Typography variant="h6" component="h6" gutterBottom>
                  {content["02_name"]}
                </Typography>
                <Typography
                  variant="body1"
                  color="textSecondary"
                  component="span"
                >
                  {content["02_job"]}
                </Typography>
              </Grid>
              {/* <Grid xs={12} sm={6} md={3}>
                <Avatar
                  alt={t.pictureAlt}
                  src={content["03_image"]}
                  className="team-picture"
                />
                <Typography variant="h6" component="h6" gutterBottom>
                  {content["03_name"]}
                </Typography>
                <Typography
                  variant="body1"
                  color="textSecondary"
                  component="span"
                >
                  {content["03_job"]}
                </Typography>
              </Grid> */}

              <Grid xs={12} sm={6} md={3}>
                <Avatar
                  alt={t.pictureAlt}
                  src={content["04_image"]}
                  className="team-picture"
                />
                <Typography variant="h6" component="h6" gutterBottom>
                  {content["04_name"]}
                </Typography>
                <Typography
                  variant="body1"
                  color="textSecondary"
                  component="span"
                >
                  {content["04_job"]}
                </Typography>
              </Grid>
              <Grid xs={12} sm={6} md={3}>
                <Avatar
                  alt={t.pictureAlt}
                  src={content["05_image"]}
                  className="team-picture"
                />
                <Typography variant="h6" component="h6" gutterBottom>
                  {content["05_name"]}
                </Typography>
                <Typography
                  variant="body1"
                  color="textSecondary"
                  component="span"
                >
                  {content["05_job"]}
                </Typography>
              </Grid>
              <Grid xs={12} sm={6} md={3}>
                <Avatar
                  alt={t.pictureAlt}
                  src={content["06_image"]}
                  className="team-picture"
                />
                <Typography variant="h6" component="h6" gutterBottom>
                  {content["06_name"]}
                </Typography>
                <Typography
                  variant="body1"
                  color="textSecondary"
                  component="span"
                >
                  {content["06_job"]}
                </Typography>
              </Grid>
              <Grid xs={12} sm={6} md={3}>
                <Avatar
                  alt={t.pictureAlt}
                  src={content["07_image"]}
                  className="team-picture"
                />
                <Typography variant="h6" component="h6" gutterBottom>
                  {content["07_name"]}
                </Typography>
                <Typography
                  variant="body1"
                  color="textSecondary"
                  component="span"
                >
                  {content["07_job"]}
                </Typography>
              </Grid>
              <Grid xs={12} sm={6} md={3}>
                <Avatar
                  alt={t.pictureAlt}
                  src={content["08_image"]}
                  className="team-picture"
                />
                <Typography variant="h6" component="h6" gutterBottom>
                  {content["08_name"]}
                </Typography>
                <Typography
                  variant="body1"
                  color="textSecondary"
                  component="span"
                >
                  {content["08_job"]}
                </Typography>
              </Grid>
              {/* <Grid xs={12} sm={6} md={3}>
              <Avatar
                alt={t.pictureAlt}
                src={content["09_image"]}
                className="team-picture"
              />
              <Typography variant="h6" component="h6" gutterBottom>
                {content["09_name"]}
              </Typography>
              <Typography
                variant="body1"
                color="textSecondary"
                component="span"
              >
                {content["09_job"]}
              </Typography>
            </Grid> */}
              {/* <Grid xs={12} sm={6} md={3}>
              <Avatar
                alt={t.pictureAlt}
                src={content["10_image"]}
                className="team-picture"
              />
              <Typography variant="h6" component="h6" gutterBottom>
                {content["10_name"]}
              </Typography>
              <Typography
                variant="body1"
                color="textSecondary"
                component="span"
              >
                {content["10_job"]}
              </Typography>
            </Grid> */}
              <Grid xs={12} sm={6} md={3}>
                <Avatar
                  alt={t.pictureAlt}
                  src={content["11_image"]}
                  className="team-picture"
                />
                <Typography variant="h6" component="h6" gutterBottom>
                  {content["11_name"]}
                </Typography>
                <Typography
                  variant="body1"
                  color="textSecondary"
                  component="span"
                >
                  <Link underline="none" href={contactHref}>
                    {content["11_job"]}
                  </Link>
                </Typography>
              </Grid>
            </Grid>
          </Box>
        </Container>
      </section>
  );
}
