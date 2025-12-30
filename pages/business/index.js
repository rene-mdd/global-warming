import { CardMedia, Grid, Typography } from "@mui/material";
import StickyMenu from "../../components/semantic/menu";
import SiteHeader from "../../components/siteHeader";
import BusinessStatistics from "../../components/semantic/business-statistics";
import business from "../../public/data/dummy";
import Footer from "../../components/semantic/footer";

function Business() {
  // not ready
  const businessTitle = "Free ESG Data";
  const websiteUrl = "https://www.global-warming.org/business";
  const businessMetaDescription =
    "Track Nestlé, JBS, Apple ESG impact: GHG emissions, deforestation, climate commitments. Open data API.";
  const businessKeywords =
    "ESG data, company emissions, GHG Scope 1 2 3, corporate climate impact, deforestation tracker, business sustainability, API";

  return (
    <>
      <SiteHeader
        description={businessMetaDescription}
        title={businessTitle}
        keywords={businessKeywords}
        websiteUrl={websiteUrl}
      />
      <StickyMenu />
      <Grid container direction="column" className="landing-page-about">
        <Typography component="h1" align="center" className="h1-business">
          Open & Free Company ESG Data
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
            Discover companies' environmental, social, and governance (ESG)
            impact data.
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
