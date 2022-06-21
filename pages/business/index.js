/* eslint-disable */
import {
  CardMedia,
  Grid,
  Typography,
} from "@mui/material";
import StickyMenu from "../../components/semantic/menu";
import SiteHeader from "../../components/siteHeader";
import CollapsibleTable from "../../components/semantic/business-statistics";

function Business() {
  // not ready
  const aboutTitle = "Business environmental impact";
  const aboutMetaDescription =
    "List of business and organization with their environmental impact";
  const aboutKeywords =
    "Global warming, environment, impact, pollution, climate change, business";

  return (
    <>
      <SiteHeader
        description={aboutTitle}
        title={aboutMetaDescription}
        keywords={aboutKeywords}
      />
      <StickyMenu />
      <Grid
        container
        direction="column"
        className="landing-page-about"
      >
        <Typography paragraph align="center" className="h1-about">
          Business Data
        </Typography>
        <Grid align="center">
          <CardMedia
            component="img"
            image="images/statistic-icon.png"
            className="landing-page-logo"
            alt="statistic"
          />
          <Typography
            component="h2"
            className="h2-landing-about"
            align="center"
            gutterBottom
          >
           Search for the environmental impact your brands have on the environment
          </Typography>
        </Grid>
        <Grid component="div" container justifyContent="center" columns={12}>
            <Grid item xs={12} md={12} lg={8} mb={6}>
            <CollapsibleTable />
            </Grid>
        </Grid>
      </Grid>
      </>
  );
}

export default Business;