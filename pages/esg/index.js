import { CardMedia, Grid, Typography } from "@mui/material";
import StickyMenu from "../../components/semantic/menu";
import SiteHeader from "../../components/siteHeader";
import BusinessStatistics from "../../components/semantic/business-statistics";
import business from "../../public/data/dummy";
import businessDe from "../../public/data/dummy.de";
import Footer from "../../components/semantic/footer";
import { useLocale, useT } from "../../lib/i18n";

function Business() {
  const t = useT().esg;
  const companies = useLocale() === "de" ? businessDe : business;
  const websiteUrl = "https://global-warming.org/esg";

  return (
    <>
      <SiteHeader
        description={t.meta.description}
        title={t.meta.title}
        keywords={t.meta.keywords}
        websiteUrl={websiteUrl}
      />
      <StickyMenu />
      <Grid container direction="column" className="landing-page-about">
        <Typography component="p" align="center" className="h1-business">
          {t.heading}
        </Typography>
        <Grid align="center">
          <CardMedia
            component="img"
            image="/images/statistic-icon.png"
            className="landing-page-logo"
            alt={t.iconAlt}
          />
          <Typography
            component="h2"
            className="h2-landing-about"
            align="center"
            gutterBottom
          >
            {t.intro}
          </Typography>
        </Grid>
        <Grid component="div" container justifyContent="center" columns={12}>
          <Grid item xs={12} md={12} lg={8} mb={6}>
            <BusinessStatistics props={companies} />
          </Grid>
        </Grid>
      </Grid>
      <Footer classNameProp="footer" />
    </>
  );
}

export default Business;
