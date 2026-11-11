/* eslint-disable */
import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { CardMedia, Container, TextField, Alert, Link } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import ReactHtmlParser from "html-react-parser";
import { useT } from "../../lib/i18n";

const theme = createTheme({
  palette: {
    primary: {
      main: "#ffffff",
    },
    pepe: {
      main: "#343837",
    },
  },
});

function Row(props) {
  const t = useT().esg.table;
  const [open, setOpen] = useState(false);
  const { included, index } = props;
  const {
    row: { attributes, relationships },
  } = props;
  // const apiHost = process.env.NEXT_PUBLIC_LOCAL_HOST;
  // const logoImgUrl = included.filter(function (o1) {
  //   // return the logo with equal id
  //   return relationships.logo.data?.id == o1.id;
  // });
  // public/data/dummy.js stores logos as relative paths ("images/x.png"),
  // which would resolve under /de/esg to /de/images/x.png and 404.
  const logoUrl =
    attributes?.imgUrl && !/^(\/|https?:)/.test(attributes.imgUrl)
      ? `/${attributes.imgUrl}`
      : attributes?.imgUrl;
  // const logoUrl = "";
  const logoImgUrl = "";
  const colorImpact =
    attributes.environmental_impact <= 5
      ? "red"
      : attributes.environmental_impact > 9
        ? "green"
        : "orange";
  return (
    <>
      <ThemeProvider theme={theme}>
        <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
          <TableCell className="sticky-column sticky-accordion">
            <IconButton
              aria-label={t.expandRow}
              size="small"
              color="primary"
              onClick={() => setOpen(!open)}
            >
              {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
          </TableCell>
          <TableCell
            component="th"
            scope="row"
            className="sticky-column sticky-company white-color tablecell-styles"
          >
            {attributes?.title}
          </TableCell>
          <TableCell align="right" className="tablecell-styles">
            {attributes?.disclosure_ghg_emission ?? t.noData} /{" "}
            {attributes?.disclosure_deforestation ?? t.noData}
          </TableCell>
          <TableCell align="right" className="tablecell-styles">
            {attributes?.commitment_status ?? t.noData}
          </TableCell>
          <TableCell align="right" className="tablecell-styles">
            {attributes?.net_emission_reduction ?? t.noData}
          </TableCell>
          <TableCell align="right" className="tablecell-styles">
            {attributes?.climate_contribution_offset ?? t.noData}
          </TableCell>
          <TableCell align="right" className="tablecell-styles">
            {attributes?.deforestation ?? t.noData}
          </TableCell>
          <TableCell align="right" sx={{ color: colorImpact }} className="tablecell-styles bold-class ">
            {attributes?.environmental_impact ?? t.noData}
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={8}>
            <Collapse in={open} timeout="auto" unmountOnExit size="100%">
              <Box sx={{ margin: 1 }}>
                <Typography
                  variant="h6"
                  gutterBottom
                  component="h6"
                  fontWeight="bold"
                >
                  {t.profile}
                </Typography>
                <Table>
                  <TableRow>
                    <TableCell align="center" className="bold-class">
                      {t.logo}
                    </TableCell>
                    <TableCell className="bold-class">
                      {t.details}
                    </TableCell>
                    <TableCell className="bold-class">
                      {t.products}
                    </TableCell>
                    <TableCell className="bold-class">{t.sources}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <CardMedia
                        className="brands-logo"
                        component="img"
                        alt={attributes?.title}
                        src={
                          logoUrl ? logoUrl : "/images/no-logo.png"
                        }
                      />
                    </TableCell>
                    <TableCell align="left" width="100%">
                      <Container
                        disableGutters
                        component="div"
                        className="text-container"
                      >
                        {ReactHtmlParser(
                          attributes?.additional_details.value
                        ) ?? t.noData}
                      </Container>
                    </TableCell>
                    <TableCell align="left">
                      <Container
                        disableGutters
                        component="div"
                        className="text-container"
                      >
                        <Typography component="p">
                          {attributes?.products_services}
                        </Typography>
                      </Container>
                    </TableCell>
                    <TableCell align="left" sx={{ maxWidth: "215px" }}>
                      <Container
                        disableGutters
                        component="div"
                        className="text-container"
                      >
                        {attributes?.services.source?.map((data, index) => {
                          return (
                            <Typography
                              textAlign="left"
                              component="a"
                              href={data?.uri}
                              key={data.title + " " + index}
                            >
                              <Typography component="p">
                                {data?.title ?? t.noData}
                              </Typography>
                            </Typography>
                          );
                        })}
                      </Container>
                    </TableCell>
                  </TableRow>
                </Table>
              </Box>
            </Collapse>
          </TableCell>
        </TableRow>
      </ThemeProvider>
    </>
  );
}

export default function BusinessStatistics({ props }) {
  const t = useT().esg;
  // content api data
  let businessData = [];
  // const [businessData, setBusinessData] = useState([]);
  // media and files api data
  const [includedData, setIncludedData] = useState([]);
  // get search value
  const [input, setInput] = useState("");
  // loading search bar
  const [loading, setLoading] = useState(false);
  // loading initial data request
  const [initialLoading, setInitialLoading] = useState(false);
  // error message
  const [errorMsg, setError] = useState(false);

  businessData = props;

  // useEffect(() => {
  //   // if (input.length > 0) {
  //   //   setLoading(true);
  //   // }
  //   const delayDebounceFn = setTimeout(() => {
  //     const businessApiUrl = `https://gist.githubusercontent.com/ddelange/22e12073e88ed8d1e75e2e0f26754d7f/raw/477e6518e34e2cf005717b29003730f54601cdf7/data_wikirate_companies_subset_wikipedia_with_metrics.json`;
  //     let header = new Headers({
  //       "Access-Control-Allow-Origin": "*",
  //       Accept: "application/vnd.api+json",
  //       "Content-Type": "application/vnd.api+json",
  //     });
  //     async function fetchBusinessData() {
  //       try {
  //         const response = await fetch(businessApiUrl, header);
  //         const business = await response.json();
  //         // setBusinessData(() => business.data);
  //         // setIncludedData(() => business.included);
  //         setLoading(false);
  //         // setInitialLoading(false);
  //       } catch (error) {
  //         setError(true);
  //         console.error(error);
  //       }
  //     }
  //     fetchBusinessData();
  //   }, 500);

  //   return () => clearTimeout(delayDebounceFn);
  // }, [input]);

  return (
    <>
      <Container maxWidth={false} align="center" sx={{ marginBottom: 1 }}>
        {/* <TextField
          label="Search"
          size="medium"
          autoComplete="off"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          InputProps={{
            endAdornment: (
              <LoadingButton
                size="small"
                loading={loading}
                className="search-loading"
                disabled
              ></LoadingButton>
            ),
          }}
        ></TextField> */}
      </Container>
      <TableContainer component={Paper}>
        <Table aria-label={t.table.ariaLabel} className="position-relative">
          <TableHead>
            <TableRow>
              <TableCell className="sticky-column sticky-accordion" />
              <TableCell className="sticky-column sticky-company">
                <Typography
                  variant="span"
                  fontWeight="bold"
                  className="white-color"
                  fontSize="large"
                >
                  {t.table.company}
                </Typography>
              </TableCell>
              <TableCell align="right">
                <Typography variant="span" fontWeight="bold" fontSize="large">
                  {t.table.disclosure}
                </Typography>
              </TableCell>
              <TableCell align="right">
                <Typography variant="span" fontWeight="bold" fontSize="large">
                  {t.table.commitment}
                </Typography>
              </TableCell>
              <TableCell align="right">
                <Typography variant="span" fontWeight="bold" fontSize="large">
                  {t.table.netReduction}
                </Typography>
              </TableCell>
              <TableCell align="right">
                <Typography variant="span" fontWeight="bold" fontSize="large">
                  {t.table.contribution}
                </Typography>
              </TableCell>
              <TableCell align="right">
                <Typography variant="span" fontWeight="bold" fontSize="large">
                  {t.table.deforestation}
                </Typography>
              </TableCell>
              <TableCell align="right">
                <Typography variant="span" fontWeight="bold" fontSize="large">
                  {t.table.impact}
                </Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {businessData.map(({ row }, index) => (
              <Row
                row={row}
                included={includedData}
                index={index}
                key={row.id}
              />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Container align="center">
        <Typography component="p" mt={3} fontSize="large">
          {t.accessData} <Link href="https://data.global-warming.org/">{t.login}</Link>
        </Typography>
        <LoadingButton
          loading={initialLoading}
          className="loading-button"
          disabled
        />
        {errorMsg && (
          <Alert severity="error">{t.fetchError}</Alert>
        )}
      </Container>
    </>
  );
}

Row.propTypes = {
  row: PropTypes.shape({
    attributes: PropTypes.shape({
      additional_details: PropTypes.shape({
        format: PropTypes.string,
        processed: PropTypes.string,
        value: PropTypes.string,
      }),
      climate_contribution_offset: PropTypes.number,
      commitment_status: PropTypes.number,
      deforestation: PropTypes.number,
      disclosure_deforestation: PropTypes.number,
      environmental_impact: PropTypes.number,
      net_emission_reduction: PropTypes.number,
      products_services: PropTypes.shape({
        format: PropTypes.string,
        processed: PropTypes.string,
        value: PropTypes.string,
        source: PropTypes.arrayOf(
          PropTypes.shape({
            options: PropTypes.shape({}),
            title: PropTypes.string,
            uri: PropTypes.string,
          })
        ),
      }),
      title: PropTypes.string,
    }),
    id: PropTypes.string,
    links: PropTypes.shape({
      self: PropTypes.shape({ href: PropTypes.string }),
    }),
    relationships: PropTypes.shape({
      category: PropTypes.shape({
        data: PropTypes.arrayOf(PropTypes.object),
        links: PropTypes.shape({
          self: PropTypes.shape({ href: PropTypes.string }),
        }),
      }),
    }),
    type: PropTypes.string,
  }),
};
