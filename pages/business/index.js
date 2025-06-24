import { CardMedia, Grid, Typography } from "@mui/material";
import StickyMenu from "../../components/semantic/menu";
import SiteHeader from "../../components/siteHeader";
import BusinessStatistics from "../../components/semantic/business-statistics";
import business from "../../public/data/dummy";
import Footer from "../../components/semantic/footer";

function Business() {
  // not ready
  const aboutTitle = "Business environmental impact";
  const websiteUrl = "https://global-warming.org/business";
  const aboutMetaDescription =
    "List of business and organization by their environmental impact";
  const aboutKeywords =
    "Global warming, environment, impact, pollution, climate change, business";

  return (
    <>
      <SiteHeader
        description={aboutMetaDescription}
        title={aboutTitle}
        keywords={aboutKeywords}
        websiteUrl={websiteUrl}
      />
      <StickyMenu />
      <Grid container direction="column" className="landing-page-about">
        <Typography component="p" align="center" className="h1-business">
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
            Find information on companies' social and environmental impact.
          </Typography>
        </Grid>
        <Grid component="div" container justifyContent="center" columns={12}>
          <Grid item xs={12} md={12} lg={8} mb={6}>
            <BusinessStatistics props={business} />
          </Grid>
        </Grid>
      </Grid>
      <Footer classNameProp="footer" />
    </>
  );
}

export default Business;
