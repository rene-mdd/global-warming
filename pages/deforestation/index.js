/* eslint-disable */
import React, { useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import Observer from "@researchgate/react-intersection-observer";
import * as Scroll from "react-scroll";
import PublicIcon from "@mui/icons-material/Public";
import {
  Container,
  CardMedia,
  Grid,
  Typography,
  Paper,
  Button,
  Divider,
  List,
  ListItemAvatar,
} from "@mui/material";
import StickyMenu from "../../components/semantic/menu";
import SiteHeader from "../../components/siteHeader";

const CognitiveServicesCredentials =
  require("ms-rest-azure").CognitiveServicesCredentials;

const azureEnvKey = process.env.API_KEY_AZURE;
const credentials = new CognitiveServicesCredentials(`${azureEnvKey}`);
const searchTerm = "deforestation";
const NewsSearchAPIClient = require("azure-cognitiveservices-newssearch");

const client = new NewsSearchAPIClient(credentials);

function SemanticDeforestation(props) {
  const [intersecting, setIntersecting] = useState(false);

  const handleIntersection = (event) => {
    if (event.isIntersecting) {
      setIntersecting(true);
    }
  };

  const { googleNewsJson, azureJson } = props;
  const options = {
    onChange: handleIntersection,
  };

  const parsedGNews = googleNewsJson.articles;
  const parsedBingNews = azureJson.value;
  const duplicateRemovalBing = parsedBingNews.filter(
    (thing, index, self) =>
      index ===
      self.findIndex(
        (t) => t.description === thing.description || t.name === thing.name
      )
  );
  const duplicateRemovalGNews = parsedGNews.filter(
    (thing, index, self) =>
      index ===
      self.findIndex(
        (t) => t.description === thing.description || t.title === thing.title
      )
  );
  const deforestationTitle = "Global deforestation news and map.";
  const deforestationMetaDescription =
    "Live news about worldwide deforestation and map builder to check on global forest loss.";
  const deforestationKeywords =
    "Deforestation, global warming, climate change, environment";

  return (
    <>
      <SiteHeader
        description={deforestationMetaDescription}
        title={deforestationTitle}
        keywords={deforestationKeywords}
      />
      <StickyMenu />
      <Grid
        container
        direction="column"
        justifyContent="center"
        className="landing-page-deforestation"
      >
        <Typography component="h2" align="center" className="h1-landing">
          Global Deforestation
        </Typography>
        <Grid align="center">
          <CardMedia
            component="img"
            image="images/forest.png"
            className="landing-page-logo"
            alt="forest logo"
          />
          <Typography
            component="h2"
            className="h2-deforestation"
            align="center"
            gutterBottom
          >
            This section is meant to gather data about the current state of
            worldwide deforestation. This is done through APIs, databases, news,
            MapBuilders, and journals.
          </Typography>
        </Grid>
        {/* <Container component="div" align="center" maxWidth={false}>
          <iframe
            title="Hectares of forests cut down or burned"
            src="https://www.theworldcounts.com/embed/challenges/93?background_color=#1fa774&color=#fff&font_family=%22Helvetica+Neue%22%2C+Arial%2C+sans-serif&font_size=14"
            style={{ border: "none" }}
            height="100"
            width="300"
          ></iframe>
        </Container> */}
        <Grid align="center" sx={{ marginTop: "auto", marginBottom: "10px" }}>
          <Scroll.Link spy smooth duration={1000} to="jump-news">
            <Button className="down-icon-wrapper">
              <CardMedia
                image="/images/icons-double-down.png"
                component="img"
                className="down-icon"
                alt="move to next section"
              />
            </Button>
          </Scroll.Link>
        </Grid>
      </Grid>
      <Divider name="jump-news" className="hide-divider" />
      <Grid className="temperature-background">
        <Typography component="h2" className="h2-general" align="center">
          Global forest loss map
        </Typography>
        <Grid container justifyContent="center">
          <Grid item sm={12} md={10}>
            <Container>
              <Container
                className="deforestation-iframe"
                component="iframe"
                frameBorder="0"
                src="https://glad.earthengine.app/view/global-forest-change#dl=1;old=off;bl=off;lon=20;lat=10;zoom=3;"
                loading="lazy"
              />
            </Container>
          </Grid>
          <Container align="center">
            <span>
              Credits: University of Maryland, department of geographical
              sciences.
            </span>
          </Container>
          <Container className="deforestation-text">
            <>
              <p>
                Results from time-series analysis of Landsat images
                characterizing forest extent and change.
              </p>
              <p>
                Trees are defined as vegetation taller than 5m in height and are
                expressed as a percentage per output grid cell as ‘2000 Percent
                Tree Cover’. ‘Forest Cover Loss’ is defined as a
                stand-replacement disturbance, or a change from a forest to
                non-forest state, during the period 2000–2019. ‘Forest Cover
                Gain’ is defined as the inverse of loss, or a non-forest to
                forest change entirely within the period 2000–2012. ‘Forest Loss
                Year’ is a disaggregation of total ‘Forest Loss’ to annual time
                scales.
              </p>
              <p>
                Reference 2000 and 2019 imagery are median observations from a
                set of quality assessment-passed growing season observations.
              </p>
            </>
          </Container>
        </Grid>
        <Divider sx={{ margin: "30px" }} />
      </Grid>
      <Container>
        <Typography component="h3" className="list-news" align="center">
          News List
        </Typography>
        <Typography component="h4" className="date">
          {`Live: ${new Date().toString()}`}
        </Typography>
        <List sx={{ width: "100%" }}>
          {duplicateRemovalGNews.map((obj) => (
            <Paper key={obj.title} elevation={2} className="news-wrapper">
              <Grid container justifyContent="center" alignItems="center">
                <Grid item md={4} xs={10}>
                  <ListItemAvatar>
                    <CardMedia
                      image={obj?.image ?? "/images/breaking-news.png"}
                      component="img"
                      alt="breaking news"
                      className="gnews-image"
                    />
                  </ListItemAvatar>
                </Grid>
                <Grid item mt={2} md={8} xs={10} alignSelf="end">
                  <a href={obj.url}>
                    <Typography
                      component="h5"
                      variant="h5"
                      sx={{ color: "#4183c4" }}
                    >
                      {obj.title}
                    </Typography>
                  </a>
                  <Typography paragraph>{obj.description}</Typography>
                  <Grid
                    container
                    justifyContent="space-around"
                    alignItems="center"
                    spacing={2}
                  >
                    <Grid item>
                      <Paper
                        sx={{ padding: "6px 16px", fontWeight: "bold" }}
                        variant="outlined"
                      >
                        Date: {obj.publishedAt}
                      </Paper>
                    </Grid>
                    <Grid item>
                      <Button
                        href={obj.url}
                        variant="contained"
                        endIcon={<PublicIcon />}
                        className="new-source"
                      >
                        {obj.source.name ?? "News"}
                      </Button>
                    </Grid>
                  </Grid>
                </Grid>
                <Observer {...options}>
                  <span />
                </Observer>
              </Grid>
            </Paper>
          ))}
          {intersecting &&
            duplicateRemovalBing.map((obj) => (
              <Paper key={obj.name} elevation={2} className="news-wrapper">
                <Grid container justifyContent="center" alignItems="center">
                  <Grid item md={4} xs={10}>
                    <ListItemAvatar>
                      <CardMedia
                        image={
                          obj?.image?.thumbnail?.contentUrl ??
                          obj?.provider[0]?.image?.thumbnail?.contentUrl ??
                          "/images/breaking-news.png"
                        }
                        component="img"
                        alt="Breaking news"
                        className="bing-image"
                      />
                    </ListItemAvatar>
                  </Grid>
                  <Grid item md={8} xs={10} mt={2}>
                    <Grid
                      item
                      sx={{ justifyContent: "end" }}
                      container
                      direction="column"
                    >
                      <a href={obj.url}>
                        <Typography
                          component="h5"
                          variant="h5"
                          sx={{ color: "#4183c4" }}
                        >
                          {obj.name}
                        </Typography>
                      </a>
                      <Typography paragraph color="text.secondary">
                        {obj.description}
                      </Typography>
                      <Grid
                        container
                        justifyContent="space-around"
                        alignItems="center"
                        spacing={2}
                      >
                        <Grid item>
                          <Paper
                            sx={{ padding: "6px 16px", fontWeight: "bold" }}
                            variant="outlined"
                          >
                            Date: {obj.datePublished}
                          </Paper>
                        </Grid>
                        <Grid item >
                          <Button
                            href={obj.url}
                            variant="contained"
                            endIcon={<PublicIcon />}
                            className="new-source"
                          >
                            {obj?.provider[0]?.name ?? "News"}
                          </Button>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Paper>
            ))}
        </List>
      </Container>
    </>
  );
}
SemanticDeforestation.propTypes = {
  googleNewsJson: PropTypes.shape({
    articleCount: PropTypes.number,
    articles: PropTypes.arrayOf(PropTypes.shape({})),
    timestamp: PropTypes.number,
  }),
  azureJson: PropTypes.shape({
    totalEstimatedMatches: PropTypes.number,
    value: PropTypes.arrayOf(PropTypes.shape({})),
    _type: PropTypes.string,
  }),
};

SemanticDeforestation.defaultProps = {
  googleNewsJson: PropTypes.shape({
    articleCount: "",
    articles: PropTypes.arrayOf("/images/breaking-news.png"),
    timestamp: 0,
  }),
  azureJson: PropTypes.shape({
    totalEstimatedMatches: 0,
    value: PropTypes.arrayOf("/images/breaking-news.png"),
    _type: "",
  }),
};

export async function getServerSideProps({ res }) {
  const resp = await client.newsOperations.search(searchTerm, {
    market: "en-XA",
    count: 100,
  });
  const gNewsVariable = process.env.API_KEY_GOOGLE;
  const gNewsResp = await axios.get(
    `https://gnews.io/api/v4/search?q=%22deforestation%22&lang=en&image=required&token=${gNewsVariable}`
  );

  const googleNewsJson = JSON.parse(JSON.stringify(gNewsResp.data));
  const azureJson = JSON.parse(JSON.stringify(resp));

  res.setHeader(
    "Cache-Control",
    "maxage=43200, s-maxage=43200, stale-while-revalidate"
  ); // Vercel Cache (Network)

  return {
    props: {
      googleNewsJson,
      azureJson,
    },
  };
}

export default SemanticDeforestation;
