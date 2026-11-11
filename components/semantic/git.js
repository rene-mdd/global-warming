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
  CircularProgress,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Grid from "@mui/material/Unstable_Grid2";
import dayjs from "dayjs";
import { useState, useEffect } from "react";
import { Octokit } from "octokit";
import { useT } from "../../lib/i18n";

const theme = createTheme({
  palette: {
    primary: {
      main: "#ffffff",
    },
  },
});

function Git() {
  const t = useT().about.git;
  function parseDate(commitDate) {
    const year = dayjs(commitDate).get("year");
    const month = dayjs(commitDate).get("month") + 1;
    const day = dayjs(commitDate).get("date");
    const hour = dayjs(commitDate).get("hour");
    const minutes = dayjs(commitDate).get("minute");
    return `${year}-${month}-${day} ${t.at} ${hour}:${minutes}`;
  }

  const [commitsPages, setCommit] = useState(13);
  const [gitResp, setGitResp] = useState([]);
  const [loadingCommits, setloadingCommits] = useState(false);
  useEffect(() => {
    async function fetchCommits() {
      const GithubToken = process.env.API_GITHUB;
      const octokit = new Octokit({ auth: GithubToken });
      try {
        if (commitsPages > 0) {
          setloadingCommits(true);
          const response = await octokit.paginate(
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
          if (response) {
            setGitResp(() => [...response].reverse());
            setloadingCommits(false);
          }
        }
      } catch (error) {
        console.error(error);
      }
    }
    fetchCommits();
  }, [commitsPages]);

  return (
    <>
      <Grid
        container
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
          <Typography variant="h2" textAlign="center" className="git-title">
            {t.title}
          </Typography>
        </Grid>
        <Grid
          xs={12}
          display="flex"
          justifyContent="center"
          alignItems="flex-end"
          mt="auto"
        >
          <Typography
            marginBlock={2}
            variant="h5"
            color="white"
            borderBottom={1}
          >
            {t.frontend}
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
            <Table aria-label={t.tableLabel}>
              <TableHead>
                <TableRow>
                  <TableCell className="bold-class">{t.message}</TableCell>
                  <TableCell className="bold-class" align="right">
                    {t.author}
                  </TableCell>
                  <TableCell className="bold-class" align="right">
                    {t.dateTime}
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
                    <TableCell align="center">{t.noCommits}</TableCell>
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
          m={2}
        >
          <ThemeProvider theme={theme}>
            <LoadingButton
              loadingIndicator={<CircularProgress color="primary" size={24} />}
              className="commits-button"
              size="large"
              color="primary"
              variant="outlined"
              onClick={() => setCommit(commitsPages - 1)}
              loading={loadingCommits}
            >
              {t.loadMore}
            </LoadingButton>
          </ThemeProvider>
        </Grid>
        <Grid
          xs={12}
          display="flex"
          justifyContent="center"
          alignItems="center"
          flexDirection="column"
        >
          {/* <Typography variant="h5" color="white" mt={5} mb={1} borderBottom={1}>
            Database / Backend
          </Typography>
          <Typography component="p" color="white">
            TBA
          </Typography> */}
        </Grid>
        <Grid mt={2} xs={12}>
          <Container component="footer" className="github-source">
            <Typography component="p" align="center" color="white">
              {t.source}{" "}
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

export default Git;
