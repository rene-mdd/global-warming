/* eslint-disable */
import React from "react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  EmailShareButton,
  FacebookShareButton,
  InstapaperShareButton,
  LineShareButton,
  LinkedinShareButton,
  LivejournalShareButton,
  MailruShareButton,
  OKShareButton,
  PinterestShareButton,
  PocketShareButton,
  RedditShareButton,
  TelegramShareButton,
  TumblrShareButton,
  TwitterShareButton,
  ViberShareButton,
  VKShareButton,
  WhatsappShareButton,
  EmailIcon,
  FacebookIcon,
  InstapaperIcon,
  LineIcon,
  LinkedinIcon,
  LivejournalIcon,
  MailruIcon,
  OKIcon,
  PinterestIcon,
  PocketIcon,
  RedditIcon,
  TelegramIcon,
  TumblrIcon,
  TwitterIcon,
  ViberIcon,
  VKIcon,
  WhatsappIcon,
} from "react-share";

const share = [
  <FacebookShareButton url="https://global-warming.org/" key="facebook">
    <FacebookIcon size={50} borderRadius={5} />
  </FacebookShareButton>,
  <EmailShareButton url="https://global-warming.org/" key="email">
    <EmailIcon size={50} borderRadius={5} />
  </EmailShareButton>,
  <InstapaperShareButton url="https://global-warming.org/" key="instagram">
    <InstapaperIcon size={50} borderRadius={5} />
  </InstapaperShareButton>,
  <LineShareButton url="https://global-warming.org/" key="line">
    <LineIcon size={50} borderRadius={5} />
  </LineShareButton>,
  <LinkedinShareButton url="https://global-warming.org/" key="linkedin">
    <LinkedinIcon size={50} borderRadius={5} />
  </LinkedinShareButton>,
  <LivejournalShareButton url="https://global-warming.org/" key="liveJournal">
    <LivejournalIcon size={50} borderRadius={5} />
  </LivejournalShareButton>,
  <MailruShareButton url="https://global-warming.org/" key="mailRu">
    <MailruIcon size={50} borderRadius={5} />
  </MailruShareButton>,
  <OKShareButton url="https://global-warming.org/" key="ok">
    <OKIcon size={50} borderRadius={5} />
  </OKShareButton>,
  <PinterestShareButton
    media="https://global-warming.org/api/chart-img/tempChart.jpeg"
    url="https://global-warming.org/"
    key="pinterest"
  >
    <PinterestIcon size={50} borderRadius={5} />
  </PinterestShareButton>,
  <PocketShareButton url="https://global-warming.org/" key="pocket">
    <PocketIcon size={50} borderRadius={5} />
  </PocketShareButton>,
  <RedditShareButton url="https://global-warming.org/" key="reddit">
    <RedditIcon size={50} borderRadius={5} />
  </RedditShareButton>,
  <TumblrShareButton url="https://global-warming.org/" key="tumblr">
    <TumblrIcon size={50} borderRadius={5} />
  </TumblrShareButton>,
  <TwitterShareButton url="https://global-warming.org/" key="twitter">
    <TwitterIcon size={50} borderRadius={5} />
  </TwitterShareButton>,
  <ViberShareButton url="https://global-warming.org/" key="viber">
    <ViberIcon size={50} borderRadius={5} />
  </ViberShareButton>,
  <VKShareButton url="https://global-warming.org/" key="vk">
    <VKIcon size={50} borderRadius={5} />
  </VKShareButton>,
  <WhatsappShareButton url="https://global-warming.org/" key="whatsapp">
    <WhatsappIcon size={50} borderRadius={5} />
  </WhatsappShareButton>,
  <TelegramShareButton url="https://global-warming.org/" key="telegram">
    <TelegramIcon size={50} borderRadius={5} />
  </TelegramShareButton>,
];

// const panelArctic = _.times(1, (i) => ({
//   key: `panel-${i}`,
//   title: {
//     content: <Label content="Get API" className="accordion-arctic" />,
//   },
//   content: {
//     content: (
//       <Message info>
//         <Message.Header as="header">
//           <p>Arctic averaged marine surface yearly mean data</p>
//         </Message.Header>
//         <Message.Content className="api-content">
//           <p>
//             This API provides the average monthly arctic sea ice extent each
//             September since 1979, derived from satellite observations. Fetch
//             this endpoint
//             <b> https://global-warming.org/api/arctic-api </b>
//             and you will get the info in JSON format.
//           </p>
//         </Message.Content>
//       </Message>
//     ),
//   },
// }));

// const panelShare = _.times(1, (i) => ({
//   key: `panel-${i}`,
//   title: {
//     content: <Label content="Share" className="accordion-arctic" />,
//   },
//   content: {
//     content: share,
//   },
// }));

const AccordionTemp = () => (
  <Accordion>
    <AccordionSummary
      expandIcon={<ExpandMoreIcon />}
      aria-controls="panel1a-header"
      sx={{ backgroundColor: "#12d3cf", borderRadius: "5px 5px 0 0" }}
    >
      <Typography sx={{ fontSize: "22px", color: "white" }}>Get API</Typography>
    </AccordionSummary>
    <AccordionDetails>
      <Typography
        gutterBottom
        variant="h5"
        sx={{ color: "#215a6d", fontWeight: "bold" }}
      >
        Global Monthly Mean Surface Temperature Change
      </Typography>
      <Typography paragraph sx={{ fontSize: "18px", color: "#276f86" }}>
        This API provides on a monthly basis, the global mean surface
        temperature anomaly from 1880.04 to the present (in celsius). Fetch this
        endpoint
        <b> https://global-warming.org/api/temperature-api </b>
        and you will get the info in JSON format.
      </Typography>
    </AccordionDetails>
  </Accordion>
);

const AccordionCo2 = () => (
  <Accordion>
    <AccordionSummary
      expandIcon={<ExpandMoreIcon />}
      aria-controls="panel2a-header"
      sx={{ backgroundColor: "#12d3cf", borderRadius: "5px 5px 0 0" }}
    >
      <Typography sx={{ fontSize: "22px", color: "white" }}>Get API</Typography>
    </AccordionSummary>
    <AccordionDetails>
      <Typography
        gutterBottom
        variant="h5"
        sx={{ color: "#215a6d", fontWeight: "bold" }}
      >
        Daily global seasonal cycle and trend value
      </Typography>
      <Typography paragraph sx={{ fontSize: "18px" }}>
        This API provides on a quasi-daily basis, the amount of carbon dioxide
        (CO2) in the atmosphere from 2010.01.01 to the present. It is expressed
        as a mole fraction in dry air, parts per million (ppm). Fetch this
        endpoint
        <b> https://global-warming.org/api/co2-api </b>
        and you will get the info in JSON format.
      </Typography>
    </AccordionDetails>
  </Accordion>
);

const AccordionMethane = () => (
  <Accordion>
    <AccordionSummary
      expandIcon={<ExpandMoreIcon />}
      aria-controls="panel3a-header"
      sx={{ backgroundColor: "#12d3cf", borderRadius: "5px 5px 0 0" }}
    >
      <Typography sx={{ fontSize: "22px", color: "white" }}>Get API</Typography>
    </AccordionSummary>
    <AccordionDetails>
      <Typography
        gutterBottom
        variant="h5"
        sx={{ color: "#215a6d", fontWeight: "bold" }}
      >
        Globally averaged marine surface monthly mean data
      </Typography>
      <Typography paragraph sx={{ fontSize: "18px" }}>
        This API provides on a monthly basis, the amount of methane in the
        atmosphere from 1983 to the present. Expressed as a mole fraction in dry
        air, parts per million (ppm). Fetch this endpoint
        <b> https://global-warming.org/api/methane-api </b>
        and you will get the info in JSON format.
      </Typography>
    </AccordionDetails>
  </Accordion>
);

const AccordionNitrous = () => (
  <Accordion>
    <AccordionSummary
      expandIcon={<ExpandMoreIcon />}
      aria-controls="panel3a-header"
      sx={{ backgroundColor: "#12d3cf", borderRadius: "5px 5px 0 0" }}
    >
      <Typography sx={{ fontSize: "22px", color: "white" }}>Get API</Typography>
    </AccordionSummary>
    <AccordionDetails>
      <Typography
        gutterBottom
        variant="h5"
        sx={{ color: "#215a6d", fontWeight: "bold" }}
      >
        Nitrous averaged marine surface monthly mean data
      </Typography>
      <Typography paragraph sx={{ fontSize: "18px" }}>
        This API provides on a monthly basis, the amount of nitrous oxide in the
        atmosphere from 2001 to the present. Expressed as a mole fraction in dry
        air, parts per million (ppm). Fetch this endpoint
        <b> https://global-warming.org/api/nitrous-oxide-api </b>
        and you will get the info in JSON format.
      </Typography>
    </AccordionDetails>
  </Accordion>
);

const AccordionArctic = () => (
  <Accordion>
    <AccordionSummary
      expandIcon={<ExpandMoreIcon />}
      aria-controls="panel3a-header"
      sx={{ backgroundColor: "#12d3cf", borderRadius: "5px 5px 0 0" }}
    >
      <Typography sx={{ fontSize: "22px", color: "white" }}>Get API</Typography>
    </AccordionSummary>
    <AccordionDetails>
      <Typography
        gutterBottom
        variant="h5"
        sx={{ color: "#215a6d", fontWeight: "bold" }}
      >
        Arctic averaged marine surface yearly mean data
      </Typography>
      <Typography paragraph sx={{ fontSize: "18px" }}>
        This API provides the average monthly arctic sea ice extent each
        September since 1979, derived from satellite observations. Fetch this
        endpoint
        <b> https://global-warming.org/api/arctic-api </b>
        and you will get the info in JSON format.
      </Typography>
    </AccordionDetails>
  </Accordion>
);

const AccordionOcean = (props) => (
  <Accordion>
    <AccordionSummary
      expandIcon={<ExpandMoreIcon />}
      aria-controls="panel3a-header"
      sx={{ backgroundColor: "#12d3cf", borderRadius: "5px 5px 0 0" }}
    >
      <Typography sx={{ fontSize: "22px", color: "white" }}>Get API</Typography>
    </AccordionSummary>
    <AccordionDetails>
      <Typography
        gutterBottom
        variant="h5"
        sx={{ color: "#215a6d", fontWeight: "bold" }}
      >
        {props.props}
      </Typography>
      <Typography paragraph sx={{ fontSize: "18px" }}>
        The Extended Reconstructed Sea Surface Temperature (ERSST) dataset is a
        global monthly analysis of SST data derived from the International
        Comprehensive Ocean–Atmosphere Dataset (
        <a href="https://journals.ametsoc.org/view/journals/bams/93/11/bams-d-11-00241.1.xml">
          ICOADS
        </a>
        ). The dataset can be used for long-term global and basin-wide studies
        and incorporates smoothed local and short-term variations. Fetch this
        endpoint <b> https://global-warming.org/api/ocean-warming-api </b>
        and you will get the info in JSON format.
      </Typography>
    </AccordionDetails>
  </Accordion>
);

// const AccordionCo2 = () => (
//   <Accordion defaultActiveIndex={1} panels={panelCo2} />
// );

// const AccordionMethane = () => (
//   <Accordion defaultActiveIndex={1} panels={panelMethane} />
// );

// const AccordionNitrous = () => (
//   <Accordion defaultActiveIndex={1} panels={panelNitrous} />
// );

// const AccordionArctic = () => (
//   <Accordion defaultActiveIndex={1} panels={panelArctic} />
// );

const AccordionShare = () => (
  <Accordion>
    <AccordionSummary
      expandIcon={<ExpandMoreIcon />}
      aria-controls="panel1a-header"
      sx={{ backgroundColor: "#12d3cf", borderRadius: "5px 5px 0 0" }}
    >
      <Typography sx={{ fontSize: "22px", color: "white" }}>Share</Typography>
    </AccordionSummary>
    <AccordionDetails>
      {share.map((social) => {
        return social;
      })}
    </AccordionDetails>
  </Accordion>
);

export {
  AccordionTemp,
  AccordionShare,
  AccordionCo2,
  AccordionMethane,
  AccordionNitrous,
  AccordionArctic,
  AccordionOcean,
};
