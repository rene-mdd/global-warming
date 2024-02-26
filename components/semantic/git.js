import Grid from "@mui/material/Unstable_Grid2"; // Grid version 2
import {
  Typography,
  TableContainer,
  Table,
  TableHead,
  TableCell,
  TableBody,
  TableRow,
  Paper,
  Container,
  Button,
} from "@mui/material";
import PropTypes from "prop-types";
import dayjs from "dayjs";
import { useState, useEffect } from "react";
import { Octokit } from "octokit";

function Git() {
  function parseDate(commitDate) {
    const year = dayjs(commitDate).get("year");
    const month = dayjs(commitDate).get("month") + 1;
    const day = dayjs(commitDate).get("date");
    const hour = dayjs(commitDate).get("hour");
    const minutes = dayjs(commitDate).get("minute");
    /* eslint-disable */
    return `${year}-${month}-${day} at ${hour}:${minutes}`;
  }

  const [commitsPages, setCommit] = useState(13);
  const [gitResp, setGitResp] = useState([]);

  useEffect(() => {
    async function fetchCommits() {
      const GithubToken = process.env.API_GITHUB;
      const octokit = new Octokit({ auth: GithubToken });
      try {
        if (commitsPages > 0) {
          const gitResponse = await octokit.paginate(
            "GET /repos/rene-mdd/global-warming/commits",
            {
              owner: "rene-mdd",
              repo: "global-warming",
              per_page: 30,
              page: commitsPages,
              headers: {
                "X-GitHub-Api-Version": "2022-11-28",
              },
            }
          );
          if (gitResponse) {
            setGitResp(() => gitResponse);
            console.log(gitResp);
          }
        }
      } catch (error) {
        console.error(error);
      }
    }
    fetchCommits();
  }, [commitsPages]);

  function fetchMoreCommits() {
    setCommit(() => commitsPages - 1);
  }

  return (
    <>
      <Grid
        container
        display="flex"
        justifyContent="center"
        alignItems="center"
        className="git-main-wrapper"
      >
        <Grid
          xs={12}
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <Typography variant="h2" className="git-title">
            Git software development updates
          </Typography>
        </Grid>
        <Grid
          xs={12}
          display="flex"
          justifyContent="center"
          alignItems="flex-end"
          mt="auto"
        >
          <Typography variant="h5" color="white" borderBottom={1}>
            Design / Frontend
          </Typography>
        </Grid>
        <Grid
          xs={12}
          md={10}
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <TableContainer
            component={Paper}
            sx={{ minWidth: 320, maxHeight: 600 }}
          >
            <Table aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell className="bold-class">Commit message</TableCell>
                  <TableCell className="bold-class" align="right">
                    Author
                  </TableCell>
                  <TableCell className="bold-class" align="right">
                    Date / Time
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {gitResp.length > 0 ? (
                  gitResp.map(({ sha, commit }) => (
                    <TableRow
                      variant="head"
                      key={sha}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell variant="head" component="th" scope="row">
                        {commit.message}
                      </TableCell>
                      <TableCell variant="head" align="right">
                        {commit.author.name}
                      </TableCell>
                      <TableCell variant="head" align="right">
                        {parseDate(commit.author.date)}
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={3} align="center">
                      No commits.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
        <Grid
          xs={12}
          display="flex"
          justifyContent="center"
          alignItems="flex-start"
        >
          <Button
            className="commits-button"
            size="large"
            color="warning"
            variant="outlined"
            sx={{ color: "white" }}
            onClick={fetchMoreCommits}
          >
            Load more commits
          </Button>
        </Grid>
        <Grid
          xs={12}
          display="flex"
          justifyContent="center"
          alignItems="flex-start"
        >
          <Typography variant="h5" color="white" borderBottom={1}>
            Database / Backend
          </Typography>
        </Grid>
        <Grid xs={12}>
          <Container component="footer" align="center" className="about-footer">
            <Typography paragraph color="white">
              Source:{" "}
              <a href="https://github.com/rene-mdd/global-warming">
                https://github.com/rene-mdd/global-warming
              </a>
            </Typography>
          </Container>
        </Grid>
      </Grid>
    </>
  );
}
Git.propTypes = {
  githubApiResponse: PropTypes.shape({
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
  }).isRequired,
};

export default Git;
