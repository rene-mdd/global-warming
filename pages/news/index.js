/* eslint-disable */
import React, { useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import * as Scroll from "react-scroll";
import PublicIcon from "@mui/icons-material/Public";
import { useInView } from "react-intersection-observer";
import {
  CardMedia,
  Container,
  Divider,
  Grid,
  Typography,
  Paper,
  Button,
  List,
  ListItemAvatar,
} from "@mui/material";
import StickyMenu from "../../components/semantic/menu";
import SiteHeader from "../../components/siteHeader";

// const { CognitiveServicesCredentials } = require("@azure/ms-rest-azure-js");

// const azureEnvKey = process.env.API_KEY_AZURE;
// const credentials = new CognitiveServicesCredentials(`${azureEnvKey}`);
// const searchTerm = "global warming";
// const { NewsSearchClient } = require("@azure/cognitiveservices-newssearch");

// const client = new NewsSearchClient(credentials);
function News(props) {
  const [intersecting, setIntersecting] = useState(false);
  const { ref, inView, entry } = useInView({
    /* Optional options */
    threshold: 0,
    onChange: (inView, entry) => setIntersecting(inView),
    triggerOnce: true,
  });

  const { googleNewsJson } = props;
  const parsedGNews = googleNewsJson.articles;
  // const parsedBingNews = jsonAzure.value;
  // const duplicateRemovalBing = parsedBingNews.filter(
  //   (thing, index, self) =>
  //     index ===
  //     self.findIndex(
  //       (t) => t.description === thing.description || t.name === thing.name
  //     )
  // );
  const duplicateRemovalGNews = parsedGNews.filter(
    (thing, index, self) =>
      index ===
      self.findIndex(
        (t) => t.description === thing.description || t.title === thing.title
      )
  );
  const newsMetaTitle = "Global warming & climate change news.";
  const newsMetaDescription =
    "Live worldwide news about global warming and climate change.";
  const newsKeywords =
    "Global warming, climate change, news, environment, green house gases";
  return (
    <>
      <SiteHeader
        description={newsMetaDescription}
        title={newsMetaTitle}
        keywords={newsKeywords}
      />
      <StickyMenu />
      <Grid
        container
        direction="column"
        justifyContent="center"
        className="landing-page-news"
      >
        <Typography component="h2" textAlign="center" className="h1-landing">
          Global Warming & Climate Change World News
        </Typography>
        <Grid align="center">
          <CardMedia
            component="img"
            image="images/icons8-news-256.png"
            className="landing-page-logo"
            alt="news logo"
          />
          <Typography component="h2" className="h2-landing">
            Up to date worldwide news about global warming and climate change.
          </Typography>
        </Grid>
        <Grid align="center" sx={{ marginTop: "auto", marginBottom: "10px" }}>
          <Scroll.Link spy smooth duration={1000} to="jump-to-news">
            <Button className="down-icon-wrapper">
              <CardMedia
                component="img"
                image="/images/icons-double-down.png"
                className="arrow-icon"
                alt="move to next section"
              />
            </Button>
          </Scroll.Link>
        </Grid>
      </Grid>
      <Divider name="jump-to-news" className="hide-divider" />
      <Container>
        <Typography component="h3" className="list-news" align="center">
          News List
        </Typography>
        <Typography component="h4" className="date"></Typography>
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
              </Grid>
            </Paper>
          ))}
          <Container ref={ref}></Container>
          {/* {intersecting &&
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
                        alt="News image"
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
                        <Grid item>
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
            ))} */}
        </List>
      </Container>
    </>
  );
}
News.propTypes = {
  googleNewsJson: PropTypes.shape({
    articleCount: PropTypes.number,
    articles: PropTypes.arrayOf(PropTypes.shape({})),
    timestamp: PropTypes.number,
  }),
  // jsonAzure: PropTypes.shape({
  //   totalEstimatedMatches: PropTypes.number,
  //   value: PropTypes.arrayOf(PropTypes.shape({})),
  //   _type: PropTypes.string,
  // }),
};

News.defaultProps = {
  googleNewsJson: PropTypes.shape({
    articleCount: 0,
    articles: PropTypes.arrayOf("/images/breaking-news.png"),
    timestamp: 0,
  }),
  // jsonAzure: PropTypes.shape({
  //   totalEstimatedMatches: 0,
  //   value: PropTypes.arrayOf("/images/breaking-news.png"),
  //   _type: "",
  // }),
};

export async function getServerSideProps({ res }) {
  const options = {
    count: 20,
    freshness: "Month",
    safeSearch: "Strict",
  };
  // const resp = await client.news.search(searchTerm, options);
  // const jsonAzure = await JSON.parse(JSON.stringify(resp));
  
  const gNewsVariable = process.env.API_KEY_GOOGLE;
  const gNewsResp = await axios.get(
    `https://gnews.io/api/v4/search?q=%22climate%20change%22&lang=en&image=required&token=${gNewsVariable}`
  );
  const googleNewsJson = JSON.parse(JSON.stringify(gNewsResp.data));

  res.setHeader(
    "Cache-Control",
    "maxage=43200, s-maxage=43200, stale-while-revalidate"
  ); // Vercel Cache (Network)

  return {
    props: {
      // jsonAzure,
      googleNewsJson,
    },
  };
}

export default News;
