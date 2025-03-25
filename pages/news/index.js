import React, { useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import * as Scroll from "react-scroll";
import PublicIcon from "@mui/icons-material/Public";
import { useInView } from "react-intersection-observer";
import Grid from "@mui/material/Unstable_Grid2"; // Grid version 2
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
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
import Footer from "../../components/semantic/footer";

function News(props) {
  const [isOpen, setToggle] = useState("");
  const [intersecting, setIntersecting] = useState(false);

  const handleChange = (title) => {
    if (isOpen.titleText === title) {
      setToggle(() => ({ titleText: "" }));
    } else {
      setToggle(() => ({ titleText: title }));
    }
  };

  const { ref } = useInView({
    /* Optional options */
    threshold: 0,
    onChange: (inView) => setIntersecting(inView),
    triggerOnce: true,
  });

  const checkifImg = (e) => {
    e.target.src = "/images/breaking-news.webp";
  };

  const { newsCatcherParseJson, googleNewsParseJson } = props;
  const duplicateRemovalCatcher = newsCatcherParseJson.filter(
    (thing, index, self) =>
      index ===
      self.findIndex(
        (t) => t.description === thing.description || t.title === thing.title
      )
  );

  const duplicateRemovalGNews = googleNewsParseJson.filter(
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
  const websiteUrl = "https://global-warming.org/news";

  return (
    <>
      <SiteHeader
        description={newsMetaDescription}
        title={newsMetaTitle}
        keywords={newsKeywords}
        websiteUrl={websiteUrl}
      />
      <StickyMenu />
      <Grid container className="landing-page-news">
        <Grid
          xs={12}
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <Typography component="h2" textAlign="center" className="h1-landing">
            Global Warming & Climate Change World News
          </Typography>
        </Grid>
        <Grid
          xs={12}
          display="flex"
          justifyContent="center"
          alignItems="center"
          flexDirection="column"
        >
          <CardMedia
            component="img"
            image="/images/icons8-news-256.png"
            className="landing-page-logo"
            alt="news logo"
          />
          <Typography component="h2" className="h2-landing">
            Up to date worldwide news about global warming and climate change.
          </Typography>
        </Grid>
        <Grid
          xs={12}
          display="flex"
          justifyContent="center"
          alignItems="center"
          sx={{ marginTop: "auto" }}
          mb={1}
        >
          <Scroll.Link spy smooth duration={1000} to="jump-to-news">
            <Button className="down-icon-wrapper">
              <CardMedia
                component="img"
                image="/images/icons-double-down-white.png"
                className="down-arrow-icon"
                alt="move to next section"
              />
            </Button>
          </Scroll.Link>
        </Grid>
      </Grid>
      <Divider name="jump-to-news" className="hide-news-divider" />
      <Container disableGutters className="news-wrapper">
        <Typography component="h3" className="news-title" align="center">
          News List
        </Typography>
        <Grid container spacing={2} justifyContent="center">
          {duplicateRemovalGNews &&
            duplicateRemovalGNews.map((obj) => (
              <Grid
                key={obj?.title}
                size={{ xs: 12, md: 6 }}
                sx={{ maxWidth: 500, width: "100%" }}
              >
                <Card
                  elevation={5}
                  className="news-card-component"
                  sx={{ maxWidth: 500 }}
                >
                  <a href={obj?.url}>
                    <CardMedia
                      component="img"
                      height="262px"
                      image={obj?.image ?? "/images/breaking-news.webp"}
                      alt="News image"
                      onError={checkifImg}
                      loading="lazy"
                    />
                    <Typography component="h5" className="overlay overlay_1">
                      {obj?.title}
                    </Typography>
                  </a>
                  <CardContent sx={{ overflowY: "hidden" }}>
                    <Typography
                      component="p"
                      color="black"
                      className="card-content-child"
                    >
                      <Box
                        sx={{
                          height: isOpen.titleText === obj?.title ? 300 : 75,
                        }}
                      >
                        <Box
                          sx={{
                            "& > :not(style)": {
                              display: "flex",
                              justifyContent: "space-around",
                              height: 120,
                              width: "100%",
                            },
                          }}
                        >
                          <div>
                            <Collapse
                              in={isOpen.titleText === obj?.title}
                              collapsedSize={85}
                              timeout={1}
                              sx={{ textAlign: "justify" }}
                            >
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
                    <Button
                      variant="contained"
                      checked={isOpen.titleText === obj?.title}
                      onClick={() => handleChange(obj?.title)}
                      ml={1}
                    >
                      {isOpen.titleText === obj?.title
                        ? "Read less"
                        : "Read more"}
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          {intersecting &&
            duplicateRemovalCatcher.map((obj) => (
              <Grid
                key={obj?.id}
                size={{ xs: 12, md: 6 }}
                sx={{ maxWidth: 500, width: "100%" }}
              >
                <Card
                  elevation={5}
                  className="news-card-component"
                  sx={{ maxWidth: 500 }}
                >
                  <a href={obj?.link}>
                    <CardMedia
                      component="img"
                      height="262px"
                      image={obj?.media ?? "/images/breaking-news.png"}
                      alt="news image"
                      onError={checkifImg}
                      loading="lazy"
                    />
                    <Typography component="h5" className="overlay overlay_1">
                      {obj?.title}
                    </Typography>
                  </a>
                  <CardContent sx={{ overflowY: "hidden" }}>
                    <Typography
                      component="p"
                      color="black"
                      className="card-content-child"
                    >
                      <Box
                        sx={{
                          height: isOpen.titleText === obj?.title ? 300 : 75,
                        }}
                      >
                        <Box
                          sx={{
                            "& > :not(style)": {
                              display: "flex",
                              justifyContent: "space-around",
                              height: 120,
                              width: "100%",
                            },
                          }}
                        >
                          <div>
                            <Collapse
                              in={isOpen.titleText === obj?.title}
                              collapsedSize={85}
                              timeout={1}
                              sx={{ textAlign: "justify" }}
                            >
                              {obj?.description?.length < 14
                                ? obj?.content
                                : obj?.description}
                            </Collapse>
                          </div>
                        </Box>
                      </Box>
                    </Typography>
                  </CardContent>
                  <CardActions className="card-content-footer" disableSpacing>
                    <Button
                      href={obj?.link}
                      variant="contained"
                      endIcon={<PublicIcon />}
                      className="new-source"
                    >
                      <span>{obj?.author ? obj?.author : "News"}</span>
                    </Button>
                    <Button
                      variant="contained"
                      checked={isOpen.titleText === obj?.title}
                      onClick={() => handleChange(obj?.title)}
                      ml={1}
                    >
                      {isOpen.titleText === obj?.title
                        ? "Read less"
                        : "Read more"}
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
        </Grid>
        <Container ref={ref} className="hide-intersecter" />
      </Container>
      <Container>
        <Typography my={2} align="center">
          News API sources:{" "}
          <a href="https://www.newscatcherapi.com/?utm_source=free-user&utm_medium=referral&utm_campaign=global-warming">
            NewsCatcher
          </a>{" "}
          & <a href="https://gnews.io/">GNews</a>
        </Typography>
      </Container>
      <Footer classNameProp="footer" />
    </>
  );
}
News.propTypes = {
  googleNewsParseJson: PropTypes.arrayOf(
    PropTypes.shape({
      url: PropTypes.string,
      image: PropTypes.string,
      title: PropTypes.string,
      content: PropTypes.string,
      source: PropTypes.shape({
        name: PropTypes.string,
      }),
    })
  ),
  newsCatcherParseJson: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string,
      link: PropTypes.string,
      media: PropTypes.string,
      title: PropTypes.string,
      summary: PropTypes.string,
    })
  ),
};
News.defaultProps = {
  googleNewsParseJson: [],
  newsCatcherParseJson: [],
};

export async function getServerSideProps({ res }) {
  const gNewsVariable = process.env.API_KEY_GOOGLE;
  const newsCatcherApi = process.env.API_CATCHER_NEWS;
  let googleNewsParseJson = [];
  let newsCatcherParseJson = [];
  const options = {
    method: "GET",
    params: {
      q: "climate change",
      lang: "en",
      sort_by: "relevancy",
    },
    headers: {
      "x-api-token": newsCatcherApi,
    },
  };
  try {
    const gNewsResp = await axios.get(
      `https://gnews.io/api/v4/search?q=%22global%20warming%22&lang=en&image=required&token=${gNewsVariable}`
    );
    const newsCatcherResp = await axios.request(
      "https://v3-api.newscatcherapi.com/api/search",
      options
    );
    if (gNewsResp) {
      googleNewsParseJson = gNewsResp.data.articles;
    }
    if (newsCatcherResp) {
      newsCatcherParseJson = newsCatcherResp.data.articles;
    }
  } catch (error) {
    console.log("hello");
    console.log(error);
  }
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
