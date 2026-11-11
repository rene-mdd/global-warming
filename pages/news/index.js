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
import { useT } from "../../lib/i18n";
import { proxyArticleImages } from "../../lib/news-image";

function News(props) {
  const copy = useT().news;
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

  const websiteUrl = "https://global-warming.org/news";

  return (
    <>
      <SiteHeader
        description={copy.meta.description}
        title={copy.meta.title}
        keywords={copy.meta.keywords}
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
            {copy.h1}
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
            alt={copy.logoAlt}
          />
          <Typography component="h2" className="h2-landing">
            {copy.intro}
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
                alt={copy.scrollAlt}
              />
            </Button>
          </Scroll.Link>
        </Grid>
      </Grid>
      <Divider name="jump-to-news" className="hide-news-divider" />
      <Container disableGutters className="news-wrapper">
        <Typography component="h3" className="news-title" align="center">
          {copy.listTitle}
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
                      alt={copy.imageAlt}
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
                      <span>{obj?.source?.name ?? copy.sourceFallback}</span>
                    </Button>
                    <Button
                      variant="contained"
                      checked={isOpen.titleText === obj?.title}
                      onClick={() => handleChange(obj?.title)}
                      ml={1}
                    >
                      {isOpen.titleText === obj?.title
                        ? copy.readLess
                        : copy.readMore}
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
                      alt={copy.imageAltCatcher}
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
                      <span>{obj?.author ? obj?.author : copy.sourceFallback}</span>
                    </Button>
                    <Button
                      variant="contained"
                      checked={isOpen.titleText === obj?.title}
                      onClick={() => handleChange(obj?.title)}
                      ml={1}
                    >
                      {isOpen.titleText === obj?.title
                        ? copy.readLess
                        : copy.readMore}
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
          {copy.sources}{" "}
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

// Logs only source, HTTP status and message. The full axios error carries the
// request config, which holds the GNews token (in the URL) and the
// NewsCatcher x-api-token header.
function logFetchError(source, error) {
  console.error(
    `${source} request failed:`,
    error?.response?.status ?? "no response",
    error?.response?.data?.message ?? error?.message
  );
}

// Article searches per locale. /de asks both APIs for German-language
// articles so the German page isn't mostly English text; every other locale
// sends exactly the English request it always has.
const NEWS_QUERIES = {
  en: { gNews: '"global warming"', newsCatcher: "climate change" },
  de: { gNews: '"Erderwärmung" OR "Klimawandel"', newsCatcher: "Klimawandel" },
};

export async function getServerSideProps({ res, locale }) {
  const lang = locale === "de" ? "de" : "en";
  const query = NEWS_QUERIES[lang];
  const gNewsVariable = process.env.API_KEY_GOOGLE;
  const newsCatcherApi = process.env.API_CATCHER_NEWS;
  let googleNewsParseJson = [];
  let newsCatcherParseJson = [];
  const options = {
    method: "GET",
    params: {
      q: query.newsCatcher,
      lang,
      sort_by: "relevancy",
    },
    headers: {
      "x-api-token": newsCatcherApi,
    },
  };
  // Each source is independent: one failing (quota, bad key, outage) still
  // leaves the other's articles on the page.
  const [gNewsResult, newsCatcherResult] = await Promise.allSettled([
    axios.get(
      `https://gnews.io/api/v4/search?q=${encodeURIComponent(
        query.gNews
      )}&lang=${lang}&image=required&token=${gNewsVariable}`
    ),
    axios.request("https://v3-api.newscatcherapi.com/api/search", options),
  ]);
  if (gNewsResult.status === "fulfilled") {
    googleNewsParseJson = proxyArticleImages(
      gNewsResult.value.data?.articles ?? [],
      "image"
    );
  } else {
    logFetchError("GNews", gNewsResult.reason);
  }
  if (newsCatcherResult.status === "fulfilled") {
    newsCatcherParseJson = proxyArticleImages(
      newsCatcherResult.value.data?.articles ?? [],
      "media"
    );
  } else {
    logFetchError("NewsCatcher", newsCatcherResult.reason);
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
