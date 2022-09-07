/* eslint-disable */
import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { CardMedia, Container, TextField } from "@mui/material";
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
import ReactHtmlParser, {
  processNodes,
  convertNodeToElement,
  htmlparser2,
} from "react-html-parser";

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
  const [open, setOpen] = useState(false);
  const { included, index } = props;
  const {
    row: { attributes },
  } = props;
  const apiHost = process.env.NEXT_PUBLIC_LOCAL_HOST;
  const logoUrl = included[index]?.attributes.uri.url;
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
              aria-label="expand row"
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
            className="sticky-column sticky-company white-color"
          >
            {attributes?.title}
          </TableCell>
          <TableCell align="right">
            {attributes?.disclosure_ghg_emission ?? "No data"} /{" "}
            {attributes?.disclosure_deforestation ?? "No data"}
          </TableCell>
          <TableCell align="right">
            {attributes?.commitment_status ?? "No data"}
          </TableCell>
          <TableCell align="right">
            {attributes?.net_emission_reduction ?? "No data"}
          </TableCell>
          <TableCell align="right">
            {attributes?.climate_contribution_offset ?? "No data"}
          </TableCell>
          <TableCell align="right">
            {attributes?.deforestation ?? "No data"}
          </TableCell>
          <TableCell align="right" sx={{ color: colorImpact }}>
            {attributes?.environmental_impact ?? "No data"}
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
                  Profile
                </Typography>
                <Table>
                  <TableRow>
                    <TableCell align="center" className="bold-class">
                      logo
                    </TableCell>
                    <TableCell className="bold-class">
                      Additional details
                    </TableCell>
                    <TableCell className="bold-class">
                      Products & services
                    </TableCell>
                    <TableCell className="bold-class">Sources</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <CardMedia
                        className="brands-logo"
                        component="img"
                        alt={attributes?.title}
                        src={logoUrl ? (apiHost + logoUrl) : "/images/no-logo.png"}
                      />
                    </TableCell>
                    <TableCell align="left" width="100%">
                      <Container
                        disableGutters
                        component="div"
                        className="text-container"
                      >
                        {ReactHtmlParser(
                          attributes?.additional_details.processed
                        ) ?? "No data"}
                      </Container>
                    </TableCell>
                    <TableCell align="left">
                      <Container
                        disableGutters
                        component="div"
                        className="text-container"
                        sx={{ fontSize: 1 }}
                      >
                        {ReactHtmlParser(
                          attributes?.products_services.processed
                        ) ?? "No data"}
                      </Container>
                    </TableCell>
                    <TableCell align="left">
                      <Container
                        disableGutters
                        component="div"
                        className="text-container"
                      >
                        {attributes?.source?.map((data, index) => {
                          return (
                            <Typography
                              textAlign="left"
                              component="a"
                              href={data?.uri}
                              key={data.title + " " + index}
                            >
                              <Typography paragraph>
                                {data?.title ?? "No data"}
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

export default function BusinessStatistics() {
  // content api data
  const [businessData, setBusinessData] = useState([]);
  // media and files api data
  const [includedData, setIncludedData] = useState([]);
  // get search value
  const [input, setInput] = useState("");
  // loading search bar
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    if(input.length > 0) {
      setLoading(true)
    }
    const delayDebounceFn = setTimeout(() => {
      const businessApiUrl = `http://global-warming-drupal.docksal/jsonapi/business?include=logo&filter[title][operator]=CONTAINS&filter[title][value]=${input}`;
      let header = new Headers({
        "Access-Control-Allow-Origin": "https://global-warming.org/",
        Accept: "application/vnd.api+json",
        "Content-Type": "application/vnd.api+json",
      });
      async function fetchBusinessData() {
        try {
          const response = await fetch(businessApiUrl, header);
          const business = await response.json();
          setBusinessData(() => business.data);
          setIncludedData(() => business.included);
          console.log(includedData)
          setLoading(false);
        } catch (error) {
          console.error(error);
        }
      }
      fetchBusinessData();
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [input]);

  return (
    <>
      <Container maxWidth={false} align="center" sx={{marginBottom: 1}}>
        <TextField
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
                color="primary"
                disabled
              >
              </LoadingButton>
            ),
          }}
        ></TextField>
      </Container>
      <TableContainer component={Paper}>
        <Table aria-label="collapsible table" className="position-relative">
          <TableHead>
            <TableRow>
              <TableCell className="sticky-column sticky-accordion" />
              <TableCell className="sticky-column sticky-company">
                <Typography
                  variant="span"
                  fontWeight="bold"
                  className="white-color"
                >
                  Company
                </Typography>
              </TableCell>
              <TableCell align="right">
                <Typography variant="span" fontWeight="bold">
                  Disclosure: GHG Emission / Deforestation
                </Typography>
              </TableCell>
              <TableCell align="right">
                <Typography variant="span" fontWeight="bold">
                  Commitment status
                </Typography>
              </TableCell>
              <TableCell align="right">
                <Typography variant="span" fontWeight="bold">
                  Net emission reduction
                </Typography>
              </TableCell>
              <TableCell align="right">
                <Typography variant="span" fontWeight="bold">
                  Climate contribution / Offsetting
                </Typography>
              </TableCell>
              <TableCell align="right">
                <Typography variant="span" fontWeight="bold">
                  Deforestation
                </Typography>
              </TableCell>
              <TableCell align="right">
                <Typography variant="span" fontWeight="bold">
                  Environmental impact
                </Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {businessData.map((row, index) => (
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
      logo: PropTypes.shape({
        data: PropTypes.string,
        links: PropTypes.shape({
          self: PropTypes.shape({ href: PropTypes.string }),
        }),
      }),
    }),
    type: PropTypes.string,
  }),
};
