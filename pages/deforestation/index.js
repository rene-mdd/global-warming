import React, { useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import * as Scroll from "react-scroll";
import PublicIcon from "@mui/icons-material/Public";
import { useInView } from "react-intersection-observer";
import Grid from "@mui/material/Unstable_Grid2"; // Grid version 2
import {
  Container,
  CardMedia,
  Typography,
  Button,
  Divider,
  Card,
  CardContent,
  Box,
  Collapse,
  CardActions,
} from "@mui/material";
import StickyMenu from "../../components/semantic/menu";
import SiteHeader from "../../components/siteHeader";

function SemanticDeforestation(props) {
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
        (t) => t.summary === thing.summary || t.title === thing.title
      )
  );

  const duplicateRemovalGNews = googleNewsParseJson.filter(
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
      <Grid container className="landing-page-deforestation">
        <Grid
          xs={12}
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <Typography component="h2" textAlign="center" className="h1-landing">
            Global Deforestation
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
            image="images/forest.png"
            className="landing-page-logo"
            alt="forest logo"
          />
          <Typography
            align="center"
            component="h2"
            className="h2-deforestation"
          >
            This section is intended to collect data on the current status of
            global deforestation. This is accomplished through the utilization
            of APIs, databases, news sources, MapBuilders, and academic
            journals.
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
        <Grid
          xs={12}
          display="flex"
          justifyContent="center"
          alignItems="center"
          sx={{ marginTop: "auto" }}
          mb={1}
        >
          <Scroll.Link spy smooth duration={1000} to="jump-news">
            <Button className="down-icon-wrapper">
              <CardMedia
                image="/images/icons-double-down-white.png"
                component="img"
                className="down-arrow-icon"
                alt="move to next section"
              />
            </Button>
          </Scroll.Link>
        </Grid>
      </Grid>
      <Divider name="jump-news" className="hide-deforestation-divider" />
      <Grid container>
        <Grid
          xs
          display="flex"
          justifyContent="center"
          alignItems="center"
          flexDirection="column"
          className="temperature-background"
        >
          <Typography component="h2" className="h2-general" align="center">
            Global forest loss map
          </Typography>
          <Grid xs="auto">
            <Container>
              <Container
                className="deforestation-iframe"
                component="iframe"
                frameBorder="0"
                src="https://glad.earthengine.app/view/global-forest-change#dl=1;old=off;bl=off;lon=20;lat=10;zoom=3;"
                loading="lazy"
              />
            </Container>
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
                  Trees are defined as vegetation taller than 5m in height and
                  are expressed as a percentage per output grid cell as ‘2000
                  Percent Tree Cover’. ‘Forest Cover Loss’ is defined as a
                  stand-replacement disturbance, or a change from a forest to
                  non-forest state, during the period 2000–2019. ‘Forest Cover
                  Gain’ is defined as the inverse of loss, or a non-forest to
                  forest change entirely within the period 2000–2012. ‘Forest
                  Loss Year’ is a disaggregation of total ‘Forest Loss’ to
                  annual time scales.
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
      </Grid>
      <Container disableGutters className="news-wrapper">
        <Typography component="h3" className="news-title" align="center">
          News List
        </Typography>
        <Grid
          container
          spacing={{ xs: 0, md: 2 }}
          rowSpacing={2}
          justifyContent="center"
        >
          {duplicateRemovalGNews &&
            duplicateRemovalGNews.map((obj) => (
              <Grid key={obj?.title}>
                <Card
                  elevation={5}
                  className="news-card-component"
                  sx={{ maxWidth: 500 }}
                >
                  <a href={obj?.url}>
                    <CardMedia
                      component="img"
                      height="262px"
                      image={obj?.image ?? "/images/breaking-news.png"}
                      alt="News image"
                      onError={checkifImg}
                      loading="lazy"
                    />
                    <Typography component="h5" className="overlay overlay_1">
                      {obj?.title}
                    </Typography>
                  </a>
                  <CardContent sx={{ overflow: "scroll" }}>
                    <Typography
                      variant="subtitle1"
                      color="black"
                      className="card-content-container"
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
              <Grid key={obj._id}>
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
                      {obj.title}
                    </Typography>
                  </a>
                  <CardContent sx={{ overflow: "scroll" }}>
                    <Typography paragraph color="black">
                      <Box
                        sx={{
                          height: isOpen.titleText === obj.title ? 300 : 75,
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
                              in={isOpen.titleText === obj.title}
                              collapsedSize={85}
                              timeout={1}
                              sx={{ textAlign: "justify" }}
                            >
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
                    <Button
                      variant="contained"
                      checked={isOpen.titleText === obj.title}
                      onClick={() => handleChange(obj.title)}
                      ml={1}
                    >
                      {isOpen.titleText === obj.title
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
      <Container component="footer">
        <Typography my={2} align="center">
          News API sources:{" "}
          <a href="https://www.newscatcherapi.com/">NewsCatcher</a> &{" "}
          <a href="https://gnews.io/">GNews</a>
        </Typography>
      </Container>
    </>
  );
}
SemanticDeforestation.propTypes = {
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
      authors: PropTypes.string,
    })
  ),
};

SemanticDeforestation.defaultProps = {
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
    url: "https://api.newscatcherapi.com/v2/search",
    params: { q: "biodiversity", lang: "en", sort_by: "relevancy" },
    headers: {
      "x-api-key": newsCatcherApi,
    },
  };

  try {
    const gNewsResp = await axios.get(
      `https://gnews.io/api/v4/search?q=%22deforestation%22&lang=en&image=required&token=${gNewsVariable}`
    );
    const newsCatcherResp = await axios.request(options);
    if (gNewsResp) {
      googleNewsParseJson = gNewsResp.data.articles;
    }
    if (newsCatcherResp) {
      newsCatcherParseJson = newsCatcherResp.data.articles;
    }
  } catch (error) {
    console.error(error);
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

export default SemanticDeforestation;
