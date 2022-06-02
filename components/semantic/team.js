/* eslint-disable */
import { Container, Grid, Box, Typography, Avatar } from "@mui/material";

export default function Team(props) {

  const content = {
    badge: "GWO",
    "header-p1": "Join our organization",
    description: "We need to show the world who is destroying it",
    "01_image": "images/rene-picture.jpeg",
    "01_name": "René Rodríguez",
    "01_job": "Creator & Frontend Developer",

    "02_image": "images/karoline-picture.png",
    "02_name": "Karoline R. Rivera",
    "02_job": "Strategy & Impact Measurement",

    "03_image": "images/keitel-picture.jpeg",
    "03_name": "Keitel Ortega",
    "03_job": "Senior Software Developer",
    "04_image": "images/empty-profile.jpeg",
    "04_name": "Team Member",
    "04_job": "Join us",

    "05_image": "images/empty-profile.jpeg",
    "05_name": "Team Member",
    "05_job": "Join us",

    "06_image": "images/empty-profile.jpeg",
    "06_name": "Team Member",
    "06_job": "Join us",

    "07_image": "images/empty-profile.jpeg",
    "07_name": "Team Member",
    "07_job": "Join us",

    "08_image": "images/empty-profile.jpeg",
    "08_name": "Team Member",
    "08_job": "Join us",
    ...props.content,
  };

  return (
    <section>
      <Container maxWidth="lg">
        <Box pt={8} pb={12} textAlign="center">
          <Box mb={9}>
            <Container maxWidth="sm">
              {/* <Typography variant="overline" color="textSecondary" paragraph>
                {content.badge}
              </Typography> */}
              <Typography
                variant="h3"
                paragraph
                color="primary"
                fontSize="1.5em"
                gutterBottom
              >
                {content["header-p1"]}
              </Typography>
              <Typography variant="subtitle1" color="textSecondary" paragraph>
                {content.description}
              </Typography>
            </Container>
          </Box>
          <Grid container spacing={6}>
            <Grid item xs={12} sm={6} md={3}>
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
            <Grid item xs={12} sm={6} md={3}>
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
            <Grid item xs={12} sm={6} md={3}>
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
            <Grid item xs={12} sm={6} md={3}>
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
            <Grid item xs={12}>
              <Typography paragraph mt={10}>
                If you want to be part of the organization write us at
                <Typography color="primary" variant="a" component="a" href="mailto: help@global-warming.org" target="_blank">
                  &nbsp;help@global-warming.org
                </Typography>
              </Typography>
              <Typography paragraph color="textSecondary" fontSize="0.8em">
                We are currently offering only volunteer work. By mid
                2023 we hope to start hiring interns and fulltime staff.
              </Typography>
            </Grid>
            {/* <Grid item xs={12} sm={6} md={3}>
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
              <Grid item xs={12} sm={6} md={3}>
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
              <Grid item xs={12} sm={6} md={3}>
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
              <Grid item xs={12} sm={6} md={3}>
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
              </Grid> */}
          </Grid>
        </Box>
      </Container>
    </section>
  );
}
