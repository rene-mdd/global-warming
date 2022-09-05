/* eslint-disable */
import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { CardMedia, Container } from "@mui/material";
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
import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2 } from 'react-html-parser';


const theme = createTheme({
  palette: {
    primary: {
      main: "#ffffff",
    },
  },
});

// function apiData(
//   attributes,
//   id,
//   links,
//   relationships,
// ) {
//   return {
//     attributes,
//     id,
//     links,
//     relationships,
//   };
// }

function Row(props) {
  const { row } = props;
  const {row: { attributes, relationships } } = props;
  console.log(row)
  const [open, setOpen] = useState(false);
  const colorImpact =
    attributes.environmental_impact <= 5 ? "red" : attributes.environmental_impact > 9 ? "green" : "orange";
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
        <TableCell component="th" scope="row" className="sticky-column sticky-company white-color">
          {attributes?.title}
        </TableCell>
        <TableCell align="right">{attributes?.disclosure_ghg_emission ?? "No data"} / {attributes?.disclosure_deforestation ?? "No data"}</TableCell>
        <TableCell align="right">{attributes?.commitment_status ?? "No data"}</TableCell>
        <TableCell align="right">{attributes?.net_emission_reduction ?? "No data"}</TableCell>
        <TableCell align="right">{attributes?.climate_contribution_offset ?? "No data"}</TableCell>
        <TableCell align="right">{attributes?.deforestation ?? "No data"}</TableCell>
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
                  <TableCell align="center">logo</TableCell>
                  <TableCell>Additional details</TableCell>
                  <TableCell>Products & services</TableCell>
                  <TableCell>Sources</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <CardMedia
                      className="brands-logo"
                      component="img"
                      alt={attributes?.title}
                      image={relationships?.logo?.links?.self}
                    />
                  </TableCell>
                  <TableCell align="left" width="100%">
                    <Container
                      disableGutters
                      component="div"
                      className="text-container"
                    >
                            {ReactHtmlParser(attributes?.additional_details.processed) ?? "No data"}
                    </Container>
                  </TableCell>
                  <TableCell align="left">
                    <Container
                      disableGutters
                      component="div"
                      className="text-container"
                    >
                            { ReactHtmlParser(attributes?.products_services.processed) ?? "No data"}
                    </Container>
                  </TableCell>
                  <TableCell align="left">
                    <Container
                      disableGutters
                      component="div"
                      className="text-container"
                    >
                      {attributes?.source?.map((data) => {
                        return (
                          <Typography
                            textAlign="left"
                            component="a"
                            href={data?.uri}
                          >
                            <Typography paragraph>{data?.title ?? "No data"}</Typography>
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

Row.propTypes = {
  row: PropTypes.shape({
    disclosure: PropTypes.string.isRequired,
    emissions: PropTypes.string.isRequired,
    commitment: PropTypes.string.isRequired,
    deforestation: PropTypes.string.isRequired,
    impact: PropTypes.string.isRequired,
    profile: PropTypes.shape({
      logo: PropTypes.string.isRequired,
      details: PropTypes.arrayOf(PropTypes.string),
      sources: PropTypes.arrayOf(
        PropTypes.shape({ name: PropTypes.string, link: PropTypes.string })
      ),
    }).isRequired,
    name: PropTypes.string.isRequired,
    offset: PropTypes.string.isRequired,
  }).isRequired,
};


export default function BusinessStatistics() {
  const [businessData, setBusinessData] = useState([]);
  useEffect(() => {
    const businessApiUrl = "http://global-warming-drupal.docksal/jsonapi/business";
    let header = new Headers({
      'Access-Control-Allow-Origin':'*',
      'Accept': 'application/vnd.api+json',
      'Content-Type': 'application/vnd.api+json'
});
    async function fetchBusinessData() {
      try {
        const response = await fetch(businessApiUrl, header);
        console.log(response)
        const business = await response.json();
        setBusinessData(business.data);
        console.log(business)
      }
      catch (error) {
        console.log(error)
      }
    }
    fetchBusinessData();
  }, [])
  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table" className="position-relative">
        <TableHead>
          <TableRow>
            <TableCell className="sticky-column sticky-accordion" />
            <TableCell className="sticky-column sticky-company">
              <Typography variant="span" fontWeight="bold" className="white-color">
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
            <Row row={row} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
