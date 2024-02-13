/* eslint-disable */
import React, { useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import * as Scroll from "react-scroll";
import PublicIcon from "@mui/icons-material/Public";
import { useInView } from "react-intersection-observer";
import Grid from '@mui/material/Unstable_Grid2'; // Grid version 2
import {
  CardMedia,
  Container,
  Divider,
  Typography,
  Button,
  Card,
  CardContent,
  CardActions,
} from "@mui/material";
import StickyMenu from "../../components/semantic/menu";
import SiteHeader from "../../components/siteHeader";
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';


function News(props) {
  const [isOpen, setToggle] = useState({ titleText: "" });

  const handleChange = (title) => {
    if (isOpen.titleText === title) {
      setToggle(() => ({ titleText: "" }));
    } else {
      setToggle(() => ({ titleText: title }));
    }
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

  // const duplicateRemovalCatcher = newsCatcherParseJson.filter(
  //   (thing, index, self) =>
  //     index ===
  //     self.findIndex(
  //       (t) => t.summary === thing.summary || t.title === thing.title
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
      <Grid container className="landing-page-news">
        <Grid xs={12} display="flex" justifyContent="center" alignItems="center" flexDirection="column">
          <Typography component="h2" textAlign="center" className="h1-landing">
            Global Warming & Climate Change World News
          </Typography>
        </Grid>
        <Grid xs={12} display="flex" justifyContent="center" alignItems="center" flexDirection="column">
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
        <Grid xs={12} display="flex" justifyContent="center" alignItems="center">
          <Scroll.Link spy smooth duration={1000} to="jump-to-news">
            <Button className="down-icon-wrapper">
              <CardMedia
                component="img"
                image="/images/icons-double-down-white.png"
                className="arrow-icon"
                alt="move to next section"
              />
            </Button>
          </Scroll.Link>
        </Grid>
      </Grid>
      <Divider name="jump-to-news" className="hide-news-divider" />
      <Container maxWidth="1920px" disableGutters={true} className="news-wrapper">
        <Typography component="h3" className="news-title" align="center">
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
                    alt="News image"
                  />
                  <Typography component="h5" className="overlay overlay_1">
                    {obj?.title}
                  </Typography>
                </a>
                <CardContent>
                  <Typography variant="subtitle1" color="black" className="card-content-container">
                    <Box sx={{ height: isOpen.titleText === obj?.title ? 300 : 75 }}>
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
                          <Collapse in={isOpen.titleText === obj?.title} collapsedSize={85} timeout={1} sx={{ "textAlign": "justify" }}>
                            {obj?.content}
                          </Collapse>
                        </div>
                      </Box>
                    </Box>
                  </Typography>
                </CardContent>
                <CardActions className="card-content-footer" disableSpacing>
                  <Button
                    href={obj?.url}
                    variant="contained"
                    endIcon={<PublicIcon />}
                    className="new-source"
                  >
                    <span>{obj?.source?.name ?? "News"}</span>
                  </Button>
                  <Button variant="contained" checked={isOpen.titleText === obj?.title} onClick={() => handleChange(obj?.title)}>{isOpen.titleText === obj?.title ? "Read less" : "Read more"}</Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
          {/* {intersecting &&
            duplicateRemovalCatcher.map((obj) => (
              <Grid xs="auto" key={obj._id}>
                <Card elevation={5} className="news-card-component" sx={{ maxWidth: 500 }}>
                  <a href={obj?.link}>
                    <CardMedia
                      component="img"
                      height="262px"
                      image={obj?.media ?? "/images/breaking-news.png"}
                      alt="news image"
                    />
                    <Typography component="h5" className="overlay overlay_1">
                      {obj.title}
                    </Typography>
                  </a>
                  <CardContent>
                    <Typography variant="subtitle1" color="black">
                      <Box sx={{ height: isOpen.titleText === obj.title ? 300 : 75 }}>
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
                            <Collapse in={isOpen.titleText === obj.title} collapsedSize={85} timeout={1} sx={{ "textAlign": "justify" }}>
                              {obj.summary}
                            </Collapse>
                          </div>
                        </Box>
                      </Box>
                    </Typography>
                  </CardContent>
                  <CardActions className="card-content-footer" disableSpacing>
                    <Button
                      href={obj.url}
                      variant="contained"
                      endIcon={<PublicIcon />}
                      className="new-source"
                    >
                      <span>{obj?.authors ? obj?.authors : "News"}</span>
                    </Button>
                    <Button variant="contained" checked={isOpen.titleText === obj.title} onClick={() => handleChange(obj.title)}>{isOpen.titleText === obj.title ? "Read less" : "Read more"}</Button>
                  </CardActions>
                </Card>
              </Grid>
            ))} */}
        </Grid>
        <Container ref={ref} className="hide-intersecter" />
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
    articles: PropTypes.objectOf(PropTypes.shape({})),
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
  // const newsCatcherApi = process.env.API_CATCHER_NEWS;
  let googleNewsParseJson;
  // let newsCatcherParseJson;
  // var options = {
  //   method: 'GET',
  //   url: 'https://api.newscatcherapi.com/v2/search',
  //   params: { q: 'climate change', lang: 'en', sort_by: 'relevancy' },
  //   headers: {
  //     'x-api-key': newsCatcherApi
  //   }
  // };
  try {
    const gNewsResp = await axios.get(
      `https://gnews.io/api/v4/search?q=%22global%20warming%22&lang=en&image=required&token=${gNewsVariable}`
    );
    // const newsCatcherResp = await axios.request(options);
    if(gNewsResp) 
     googleNewsParseJson = JSON.parse(JSON.stringify(gNewsResp.data));
    // if(newsCatcherResp)
    //  newsCatcherParseJson = JSON.parse(JSON.stringify(newsCatcherResp.data.articles));
  } catch (error) {
    console.error(error);
  }
  res.setHeader(
    "Cache-Control",
    "maxage=43200, s-maxage=43200, stale-while-revalidate"
  ); // Vercel Cache (Network)
  return {
    props: {
      // newsCatcherParseJson,
      googleNewsParseJson,
    },
  };

}

export default News;
