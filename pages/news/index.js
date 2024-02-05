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

function News(props) {
  const [intersecting, setIntersecting] = useState(false);
  const { ref, inView, entry } = useInView({
    /* Optional options */
    threshold: 0,
    onChange: (inView, entry) => setIntersecting(inView),
    triggerOnce: true,
  });

  const { newsCatcherParseJson, googleNewsParseJson } = props;
  const parsedGNews = googleNewsParseJson.articles;

  // const duplicateRemovalCatcher = newsCatcherParseJson.filter(
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
              <Grid pr={4} container justifyContent="center" alignItems="center">
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
                  <Typography paragraph sx={{ color: "white" }}>{obj.description}</Typography>
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
          {intersecting &&
            newsCatcherParseJson.map((obj) => (
              <Paper key={obj._id} elevation={2} className="news-wrapper">
                <Grid pr={4} container justifyContent="center" alignItems="center">
                  <Grid item md={4} xs={10}>
                    <ListItemAvatar>
                      <CardMedia
                        image={
                          obj?.media ??
                          "/images/breaking-news.png"
                        }
                        component="img"
                        alt="News image"
                        className="catch-image"
                      />
                    </ListItemAvatar>
                  </Grid>
                  <Grid item md={8} xs={10} mt={2}>
                    <Grid
                      item
                      sx={{ justifyContent: "end" }}
                      container
                      direction="column"
                      className="news-info-wrapper"
                    >
                      <a href={obj.link}>
                        <Typography
                          component="h5"
                          variant="h5"
                          sx={{ color: "#4183c4" }}
                        >
                          {obj.title}
                        </Typography>
                      </a>
                      <Typography paragraph color="text.secondary">
                        {obj.summary}
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
                            Date: {obj.published_date}
                          </Paper>
                        </Grid>
                        <Grid item>
                          <Button
                            href={obj.url}
                            variant="contained"
                            endIcon={<PublicIcon />}
                            className="new-source"
                          >
                           <span> {obj?.authors ?? "News"} </span>
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
News.propTypes = {
  googleNewsJson: PropTypes.shape({
    articleCount: PropTypes.number,
    articles: PropTypes.arrayOf(PropTypes.shape({})),
    timestamp: PropTypes.number,
  }),
  newsCatcherParseJson: PropTypes.shape({
    articles: PropTypes.arrayOf(PropTypes.shape({})),
  }),
};

News.defaultProps = {
  googleNewsParseJson: PropTypes.shape({
    articleCount: 0,
    articles: PropTypes.arrayOf("/images/breaking-news.png"),
    timestamp: 0,
  }),
  newsCatcherParseJson: PropTypes.shape({
    articleCount: 0,
    articles: PropTypes.arrayOf("/images/breaking-news.png"),
    timestamp: 0,
  }),
};

export async function getServerSideProps({ res }) {

  const gNewsVariable = process.env.API_KEY_GOOGLE;
  const newsCatcherApi = process.env.API_CATCHER_NEWS;

  var options = {
    method: 'GET',
    url: 'https://api.newscatcherapi.com/v2/search',
    params: { q: 'climate change', lang: 'en', sort_by: 'relevancy' },
    headers: {
      'x-api-key': newsCatcherApi
    }
  };

  const gNewsResp = await axios.get(
    `https://gnews.io/api/v4/search?q=%22global%20warming%22&lang=en&image=required&token=${gNewsVariable}`
  );
  const newsCatcherResp = await axios.request(options);

  const googleNewsParseJson = JSON.parse(JSON.stringify(gNewsResp.data));
  const newsCatcherParseJson = JSON.parse(JSON.stringify(newsCatcherResp.data.articles));


  res.setHeader(
    "Cache-Control",
    "maxage=43200, s-maxage=43200, stale-while-revalidate"
  ); // Vercel Cache (Network)

  return {
    props: {
      newsCatcherParseJson,
      googleNewsParseJson,
    },
  };
}

export default News;
