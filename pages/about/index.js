/* eslint-disable */
import * as Scroll from "react-scroll";
import { CardMedia, Typography, Button, Divider, Grid } from "@mui/material";
import StickyMenu from "../../components/semantic/menu";
import SiteHeader from "../../components/siteHeader";
import Team from "../../components/semantic/team";
import CustomizedTimeline from "../../components/semantic/customized-timeline";
import aboutData from "../../public/SSG/about.json";
import Git from "../../components/semantic/git";
import { Octokit } from "octokit";
import PropTypes from "prop-types";
import { useState } from "react";
import { useEffect } from "react";
import { useRouter } from 'next/router';


function About(props) {
  const router = useRouter();
  console.log(props);
  // const [loadMoreCommits, setCommit] = useState(13);

  const {
    aboutData: {
      aboutTitle,
      aboutMetaDescription,
      aboutKeywords,
      pageTitle,
      subTitle,
      timelineTitle,
    },
    githubApiResponse,
  } = props;

  useEffect(() => {
    router.replace(router.asPath);
    console.log(router.replace(router.asPath));

  }, []);

  // const loadMorePages = (() => {
  //   return test;
  // });

  return (
    <>
      <SiteHeader
        description={aboutMetaDescription}
        title={aboutTitle}
        keywords={aboutKeywords}
      />
      <StickyMenu />
      <Grid
        container
        direction="column"
        justifyContent="center"
        className="landing-page-about"
      >
        <Typography paragraph align="center" className="about-title ">
          {pageTitle}
        </Typography>
        <Grid align="center">
          <CardMedia
            component="img"
            image="images/logo-planet-image.png"
            className="landing-page-logo"
            alt="planet dying logo"
          />
          <Typography
            component="h2"
            className="h2-landing-about"
            align="center"
            gutterBottom
          >
            {subTitle}
          </Typography>
        </Grid>
        <Grid component="div" container justifyContent="center">
          <Grid item>
            <iframe
              title="Tons of CO2 emitted into the atmosphere"
              src="https://www.theworldcounts.com/embed/challenges/23?background_color=#ffffff&color=black&font_family=%22Helvetica+Neue%22%2C+Arial%2C+sans-serif&font_size=14"
              style={{ border: "none", width: "100%" }}
              height="125"
              width="300"
              loading="lazy"
            ></iframe>
          </Grid>
          <Grid item>
            <iframe
              title="World average temperature (°C)"
              src="https://www.theworldcounts.com/embed/challenges/21?background_color=#ffffff&color=black&font_family=%22Helvetica+Neue%22%2C+Arial%2C+sans-serif&font_size=14"
              style={{ border: "none", width: "100%" }}
              height="125"
              width="300"
              loading="lazy"
            ></iframe>
          </Grid>
        </Grid>
        <Grid align="center" sx={{ marginTop: "auto", marginBottom: "10px" }}>
          <Scroll.Link spy smooth duration={1000} to="jump-news" Ref="nofollow">
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
      <Grid container className="timeline">
        <Typography variant="h2" className="timeline-title">
          {timelineTitle}
        </Typography>
        <CustomizedTimeline />
      </Grid>
      <Grid container className="team-wrapper">
        <Grid xs={12}>
          <Team />
        </Grid>
      </Grid>
      <Grid container className="team-wrapper">
        <Grid xs={12}>
          <Git githubApiResponse={githubApiResponse} />
          <Button variant="text">
            Text
          </Button>
        </Grid>
      </Grid>
    </>
  );
}

About.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      sha: PropTypes.string.isRequired,
      commit: PropTypes.shape({
        author: PropTypes.shape({
          name: PropTypes.string.isRequired,
          date: PropTypes.string.isRequired, // Assuming date is a string
        }).isRequired,
        message: PropTypes.string.isRequired,
      }).isRequired,
    })
  ).isRequired,
  headers: PropTypes.objectOf({}).isRequired,
  status: PropTypes.number.isRequired,
  url: PropTypes.string.isRequired,
};

export async function getServerSideProps({ res, query }) {
  const GithubToken = process.env.API_GITHUB;
  let githubApiResponse = [];
  console.log("hello")
  console.log(query)
  const octokit = new Octokit({ auth: GithubToken });

  try {
    const response = await octokit.paginate(
      "GET /repos/rene-mdd/global-warming/commits",
      {
        owner: "rene-mdd",
        repo: "global-warming",
        per_page: 30,
        page: 13,
        headers: {
          "X-GitHub-Api-Version": "2022-11-28",
        },
      }
    );
    githubApiResponse = response;
  } catch (error) {
    console.error(error);
  }

  res.setHeader(
    "Cache-Control",
    "maxage=43200, s-maxage=43200, stale-while-revalidate"
  ); // Vercel Cache (Network)
  return {
    props: {
      githubApiResponse,
      aboutData,
    },
  };
}

export default About;
