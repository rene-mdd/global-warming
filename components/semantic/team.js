import { Container, Box, Typography, Avatar, Link } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";

export default function Team() {
  const content = {
    badge: "GWO",
    "header-p1": "Join our organization",
    description: "We must disclose the environmental impact of every business.",
    "01_image": "images/rene-picture.jpg",
    "01_name": "René Rodríguez",
    "01_job": "Founder & Software Developer",

    "02_image": "images/karoline-picture.png",
    "02_name": "Karoline R. Rivera",
    "02_job": "Strategy & Impact Measurement",

    "03_image": "images/keitel-picture.jpeg",
    "03_name": "Keitel Ortega",
    "03_job": "Senior Software Developer",

    "04_image": "images/darshan.jpeg",
    "04_name": "Darshan Parashuramappa",
    "04_job": "Data Analyst",

    "05_image": "images/emma.jpeg",
    "05_name": "Emma Finnamore",
    "05_job": "Fundraiser",

    "06_image": "images/yana-picture.jpeg",
    "06_name": "Yana chistovskaya",
    "06_job": "Fundraiser - Marketing",

    "07_image": "images/farah.jpeg",
    "07_name": "Farah Fauth P.",
    "07_job": "Lead ESG Researcher",

    "08_image": "images/nina.png",
    "08_name": "Nina Nowak",
    "08_job": "Data Scientist",

    "09_image": "images/hailey.jpeg",
    "09_name": "Hailey Foster",
    "09_job": "Fundraiser / Grant writer",

    "10_image": "images/veronica.jpeg",
    "10_name": "Veronica Marotta",
    "10_job": "Fundraiser",

    "11_image": "images/empty-profile.jpeg",
    "11_name": "Team Member",
    "11_job": "Join us",
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
                alt="teammate picture"
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
                alt="teammate picture"
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
            <Grid xs={12} sm={6} md={3}>
              <Avatar
                alt="teammate picture"
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
            </Grid>

            <Grid xs={12} sm={6} md={3}>
              <Avatar
                alt="teammate picture"
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
                alt="teammate picture"
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
                alt="teammate picture"
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
                alt="teammate picture"
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
                alt="teammate picture"
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
            <Grid xs={12} sm={6} md={3}>
              <Avatar
                alt="teammate picture"
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
            </Grid>
            <Grid xs={12} sm={6} md={3}>
              <Avatar
                alt="teammate picture"
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
            </Grid>
            <Grid xs={12} sm={6} md={3}>
              <Avatar
                alt="teammate picture"
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
                <Link underline="none" href="/contact">{content["11_job"]}</Link>
              </Typography>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </section>
  );
}
