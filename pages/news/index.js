/* eslint-disable */
import React, { useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import * as Scroll from "react-scroll";
import IconButton from '@mui/material/IconButton';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import PublicIcon from "@mui/icons-material/Public";
import { useInView } from "react-intersection-observer";
import Grid from '@mui/material/Unstable_Grid2'; // Grid version 2

import {
  CardMedia,
  Container,
  Divider,
  Typography,
  Paper,
  Button,
  List,
  ListItemAvatar,
  Card,
  CardContent,
  CardActions,
} from "@mui/material";
import StickyMenu from "../../components/semantic/menu";
import SiteHeader from "../../components/siteHeader";
import Box from '@mui/material/Box';
import Switch from '@mui/material/Switch';
import Fade from '@mui/material/Fade';
import FormControlLabel from '@mui/material/FormControlLabel';
import Collapse from '@mui/material/Collapse';


function News(props) {
  const [checked, setChecked] = useState(false);

  const handleChange = () => {
    setChecked((prev) => !prev);
  };

  const [intersecting, setIntersecting] = useState(false);

  const { ref, inView, entry } = useInView({
    /* Optional options */
    threshold: 0,
    onChange: (inView, entry) => setIntersecting(inView),
    triggerOnce: true,
  });

  const { newsCatcherParseJson, googleNewsParseJson } = props;
  const parsedGNews = googleNewsParseJson.articles;

  const duplicateRemovalCatcher = newsCatcherParseJson.filter(
    (thing, index, self) =>
      index ===
      self.findIndex(
        (t) => t.summary === thing.summary || t.title === thing.title
      )
  );

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
        <Grid container>
          <Grid xs display="flex" justifyContent="center" alignItems="center" flexDirection="column">
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
        </Grid>
        <Grid xs display="flex" justifyContent="center" alignItems="center" sx={{ marginTop: "auto", marginBottom: "10px" }}>
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
      <Container maxWidth={false} disableGutters={true} className="news-wrapper">
        <Typography component="h3" className="list-news" align="center">
          News List
        </Typography>
        <Typography component="h4" className="date"></Typography>
        <Grid container spacing={2} justifyContent="center">
          {duplicateRemovalGNews.map((obj, index) => (
            <Grid xs="auto" key={index}>
              <Card elevation={5} className="news-card-component" sx={{ maxWidth: 500 }}>
                <a href={obj?.url}>
                  <CardMedia
                    component="img"
                    height="262px"
                    image={obj?.image ?? "/images/breaking-news.png"}
                    alt="Paella dish"

                  />
                  <Typography component="h5" className="overlay overlay_1">
                    {obj.title}
                  </Typography>
                </a>
                <CardContent>
                  <Typography variant="subtitle1" color="black">
                    <Box sx={{ height: checked ? 300 : 75 }}>

                      <Box
                        sx={{
                          '& > :not(style)': {
                            display: 'flex',
                            justifyContent: 'space-around',
                            height: 120,
                            width: '100%',
                          },
                        }}
                      >
                        <div>
                          <Collapse in={checked} collapsedSize={85} timeout={1} sx={{ "text-align": "justify" }}>
                            {obj.description}
                          </Collapse>
                        </div>
                      </Box>
                    </Box>
                  </Typography>
                </CardContent>
                <CardActions sx={{ "justify-content": "space-around" }} disableSpacing>
                  <Button
                    href={obj.url}
                    variant="contained"
                    endIcon={<PublicIcon />}
                    className="new-source"
                  >
                    <span>{obj?.source?.name ?? "News"}</span>
                  </Button>
                  <Paper variant="outlined"
                    sx={{ padding: "9px 10px", margin: "0 10px", fontWeight: "bold" }}
                  >
                    {obj.publishedAt}
                  </Paper>

                  <Button variant="contained" checked={checked} onClick={handleChange}>{checked ? "Read less" : "Read more"}</Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
          <Container ref={ref}></Container>
          {intersecting &&
            duplicateRemovalCatcher.map((obj) => (
              <Grid xs="auto" key={obj._id}>
                <Card elevation={5} className="news-card-component" sx={{ maxWidth: 500 }}>
                  <a href={obj?.link}>
                    <CardMedia
                      component="img"
                      height="262px"
                      image={obj?.media ?? "/images/breaking-news.png"}
                      alt="Paella dish"
                    />
                    <Typography component="h5" className="overlay overlay_1">
                      {obj.title}
                    </Typography>
                  </a>
                  <CardContent>
                    <Typography variant="subtitle1" color="black">
                      <Box sx={{ height: checked ? 300 : 75 }}>
                        <Box
                          sx={{
                            '& > :not(style)': {
                              display: 'flex',
                              justifyContent: 'space-around',
                              height: 120,
                              width: '100%',
                            },
                          }}
                        >
                          <div>
                            <Collapse in={checked} collapsedSize={85} timeout={1} sx={{ "text-align": "justify" }}>
                              {obj.summary}
                            </Collapse>
                          </div>
                        </Box>
                      </Box>
                    </Typography>
                  </CardContent>
                  <CardActions sx={{ "justify-content": "space-around" }} disableSpacing>
                    <Button
                      href={obj.url}
                      variant="contained"
                      endIcon={<PublicIcon />}
                      className="new-source"
                    >
                      <span>{obj?.authors ? obj?.authors : "News"}</span>
                    </Button>
                    <Paper variant="outlined"
                      sx={{ padding: "9px 10px", margin: "0 10px", fontWeight: "bold" }}
                    >
                      {obj.published_date}
                    </Paper>
                    <Button variant="contained" checked={checked} onClick={handleChange}>{checked ? "Read less" : "Read more"}</Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
        </Grid>
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
  console.log(googleNewsParseJson)
  console.log(newsCatcherParseJson)

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
