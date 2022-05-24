/* eslint-disable */
import {
    Container,
    Grid,
    Box,
    Typography,
    Avatar,
  } from "@mui/material";
  
  export default function Team(props) {
  
    const content = {
      badge: "LOREM IPSUM",
      "header-p1": "Donec lacinia",
      "header-p2": "turpis non sapien lobortis pretium",
      description:
        "Integer feugiat massa sapien, vitae tristique metus suscipit nec.",
      "01_image":
        "https://images.unsplash.com/photo-1557862921-37829c790f19?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd91&w=256&ah=256&q=80",
      "01_name": "Danny Bailey",
      "01_job": "CEO & Founder",
  
      "02_image":
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&w=256&ah=256&q=80",
      "02_name": "Alice Bradley",
      "02_job": "Head of Operations",
  
      "03_image":
        "https://images.unsplash.com/photo-1560298803-1d998f6b5249?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd91&w=256&ah=256&q=80",
      "03_name": "Ian Brown",
      "03_job": "Head of Development",
  
      "04_image":
        "https://images.unsplash.com/photo-1492633423870-43d1cd2775eb?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd91&w=256&ah=256&q=80",
      "04_name": "Daisy Carter",
      "04_job": "Sales Director",
  
      "05_image":
        "https://images.unsplash.com/photo-1557862921-37829c790f19?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd91&w=256&ah=256&q=80",
      "05_name": "Danny Bailey",
      "05_job": "CEO & Founder",
  
      "06_image":
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&w=256&ah=256&q=80",
      "06_name": "Alice Bradley",
      "06_job": "Head of Operations",
  
      "07_image":
        "https://images.unsplash.com/photo-1560298803-1d998f6b5249?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd91&w=256&ah=256&q=80",
      "07_name": "Ian Brown",
      "07_job": "Head of Development",
  
      "08_image":
        "https://images.unsplash.com/photo-1492633423870-43d1cd2775eb?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd91&w=256&ah=256&q=80",
      "08_name": "Daisy Carter",
      "08_job": "Sales Director",
      ...props.content,
    };
  
    return (
      <section>
        <Container maxWidth="lg">
          <Box pt={8} pb={12} textAlign="center">
            <Box mb={9}>
              <Container maxWidth="sm">
                <Typography variant="overline" color="textSecondary" paragraph>
                  {content.badge}
                </Typography>
                <Typography variant="h3" component="h2" gutterBottom>
                  <Typography variant="h3" component="span" color="primary">
                    {content["header-p1"]}
                  </Typography>
                  <Typography variant="h3" component="span">
                    {content["header-p2"]}
                  </Typography>
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
              <Grid item xs={12} sm={6} md={3}>
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
              </Grid>
            </Grid>
          </Box>
        </Container>
      </section>
    );
  }
  