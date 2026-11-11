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

import RichText from "./richText";
import { useLocale, useT } from "../../lib/i18n";

// Shares the home page in the language the visitor is reading.
const shareButtons = (url) => [
  <FacebookShareButton url={url} key="facebook">
    <FacebookIcon size={50} borderRadius={5} />
  </FacebookShareButton>,
  <EmailShareButton url={url} key="email">
    <EmailIcon size={50} borderRadius={5} />
  </EmailShareButton>,
  <InstapaperShareButton url={url} key="instagram">
    <InstapaperIcon size={50} borderRadius={5} />
  </InstapaperShareButton>,
  <LineShareButton url={url} key="line">
    <LineIcon size={50} borderRadius={5} />
  </LineShareButton>,
  <LinkedinShareButton url={url} key="linkedin">
    <LinkedinIcon size={50} borderRadius={5} />
  </LinkedinShareButton>,
  <LivejournalShareButton url={url} key="liveJournal">
    <LivejournalIcon size={50} borderRadius={5} />
  </LivejournalShareButton>,
  <MailruShareButton url={url} key="mailRu">
    <MailruIcon size={50} borderRadius={5} />
  </MailruShareButton>,
  <OKShareButton url={url} key="ok">
    <OKIcon size={50} borderRadius={5} />
  </OKShareButton>,
  <PinterestShareButton
    media="https://global-warming.org/api/chart-img/tempChart.jpeg"
    url={url}
    key="pinterest"
  >
    <PinterestIcon size={50} borderRadius={5} />
  </PinterestShareButton>,
  <PocketShareButton url={url} key="pocket">
    <PocketIcon size={50} borderRadius={5} />
  </PocketShareButton>,
  <RedditShareButton url={url} key="reddit">
    <RedditIcon size={50} borderRadius={5} />
  </RedditShareButton>,
  <TumblrShareButton url={url} key="tumblr">
    <TumblrIcon size={50} borderRadius={5} />
  </TumblrShareButton>,
  <TwitterShareButton url={url} key="twitter">
    <TwitterIcon size={50} borderRadius={5} />
  </TwitterShareButton>,
  <ViberShareButton url={url} key="viber">
    <ViberIcon size={50} borderRadius={5} />
  </ViberShareButton>,
  <VKShareButton url={url} key="vk">
    <VKIcon size={50} borderRadius={5} />
  </VKShareButton>,
  <WhatsappShareButton url={url} key="whatsapp">
    <WhatsappIcon size={50} borderRadius={5} />
  </WhatsappShareButton>,
  <TelegramShareButton url={url} key="telegram">
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

const AccordionTemp = () => {
  const t = useT().api;
  return (
  <Accordion>
    <AccordionSummary
      expandIcon={<ExpandMoreIcon />}
      aria-controls="panel1a-header"
      sx={{ backgroundColor: "#12d3cf", borderRadius: "5px 5px 0 0" }}
    >
      <Typography sx={{ fontSize: "22px", color: "white" }}>{t.getApi}</Typography>
    </AccordionSummary>
    <AccordionDetails>
      <Typography
        gutterBottom
        variant="h5"
        sx={{ color: "#215a6d", fontWeight: "bold" }}
      >
        {t.temperature.title}
      </Typography>
      <Typography component="p" sx={{ fontSize: "18px", color: "#276f86" }}>
        <RichText parts={t.temperature.body} />
        <b> https://global-warming.org/api/temperature-api </b>
        {t.fetchEnd}
      </Typography>
    </AccordionDetails>
  </Accordion>
  );
};

const AccordionCo2 = () => {
  const t = useT().api;
  return (
  <Accordion>
    <AccordionSummary
      expandIcon={<ExpandMoreIcon />}
      aria-controls="panel2a-header"
      sx={{ backgroundColor: "#12d3cf", borderRadius: "5px 5px 0 0" }}
    >
      <Typography sx={{ fontSize: "22px", color: "white" }}>{t.getApi}</Typography>
    </AccordionSummary>
    <AccordionDetails>
      <Typography
        gutterBottom
        variant="h5"
        sx={{ color: "#215a6d", fontWeight: "bold" }}
      >
        {t.co2.title}
      </Typography>
      <Typography component="p" sx={{ fontSize: "18px" }}>
        <RichText parts={t.co2.body} />
        <b> https://global-warming.org/api/co2-api </b>
        {t.fetchEnd}
      </Typography>
    </AccordionDetails>
  </Accordion>
  );
};

const AccordionMethane = () => {
  const t = useT().api;
  return (
  <Accordion>
    <AccordionSummary
      expandIcon={<ExpandMoreIcon />}
      aria-controls="panel3a-header"
      sx={{ backgroundColor: "#12d3cf", borderRadius: "5px 5px 0 0" }}
    >
      <Typography sx={{ fontSize: "22px", color: "white" }}>{t.getApi}</Typography>
    </AccordionSummary>
    <AccordionDetails>
      <Typography
        gutterBottom
        variant="h5"
        sx={{ color: "#215a6d", fontWeight: "bold" }}
      >
        {t.methane.title}
      </Typography>
      <Typography component="p" sx={{ fontSize: "18px" }}>
        <RichText parts={t.methane.body} />
        <b> https://global-warming.org/api/methane-api </b>
        {t.fetchEnd}
      </Typography>
    </AccordionDetails>
  </Accordion>
  );
};

const AccordionNitrous = () => {
  const t = useT().api;
  return (
  <Accordion>
    <AccordionSummary
      expandIcon={<ExpandMoreIcon />}
      aria-controls="panel3a-header"
      sx={{ backgroundColor: "#12d3cf", borderRadius: "5px 5px 0 0" }}
    >
      <Typography sx={{ fontSize: "22px", color: "white" }}>{t.getApi}</Typography>
    </AccordionSummary>
    <AccordionDetails>
      <Typography
        gutterBottom
        variant="h5"
        sx={{ color: "#215a6d", fontWeight: "bold" }}
      >
        {t.nitrous.title}
      </Typography>
      <Typography component="p" sx={{ fontSize: "18px" }}>
        <RichText parts={t.nitrous.body} />
        <b> https://global-warming.org/api/nitrous-oxide-api </b>
        {t.fetchEnd}
      </Typography>
    </AccordionDetails>
  </Accordion>
  );
};

const AccordionArctic = () => {
  const t = useT().api;
  return (
  <Accordion>
    <AccordionSummary
      expandIcon={<ExpandMoreIcon />}
      aria-controls="panel3a-header"
      sx={{ backgroundColor: "#12d3cf", borderRadius: "5px 5px 0 0" }}
    >
      <Typography sx={{ fontSize: "22px", color: "white" }}>{t.getApi}</Typography>
    </AccordionSummary>
    <AccordionDetails>
      <Typography
        gutterBottom
        variant="h5"
        sx={{ color: "#215a6d", fontWeight: "bold" }}
      >
        {t.arctic.title}
      </Typography>
      <Typography component="p" sx={{ fontSize: "18px" }}>
        <RichText parts={t.arctic.body} />
        <b> https://global-warming.org/api/arctic-api </b>
        {t.fetchEnd}
      </Typography>
    </AccordionDetails>
  </Accordion>
  );
};

const AccordionOcean = (props) => {
  const t = useT().api;
  return (
  <Accordion>
    <AccordionSummary
      expandIcon={<ExpandMoreIcon />}
      aria-controls="panel3a-header"
      sx={{ backgroundColor: "#12d3cf", borderRadius: "5px 5px 0 0" }}
    >
      <Typography sx={{ fontSize: "22px", color: "white" }}>{t.getApi}</Typography>
    </AccordionSummary>
    <AccordionDetails>
      <Typography
        gutterBottom
        variant="h5"
        sx={{ color: "#215a6d", fontWeight: "bold" }}
      >
        {props.props}
      </Typography>
      <Typography component="p" sx={{ fontSize: "18px" }}>
        <RichText parts={t.ocean.body} /> <b> https://global-warming.org/api/ocean-warming-api </b>
        {t.fetchEnd}
      </Typography>
    </AccordionDetails>
  </Accordion>
  );
};

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

const AccordionShare = () => {
  const t = useT().api;
  const locale = useLocale();
  const url =
    locale === "de" ? "https://global-warming.org/de" : "https://global-warming.org/";
  return (
  <Accordion>
    <AccordionSummary
      expandIcon={<ExpandMoreIcon />}
      aria-controls="panel1a-header"
      sx={{ backgroundColor: "#12d3cf", borderRadius: "5px 5px 0 0" }}
    >
      <Typography sx={{ fontSize: "22px", color: "white" }}>{t.share}</Typography>
    </AccordionSummary>
    <AccordionDetails>
      {shareButtons(url).map((social) => {
        return social;
      })}
    </AccordionDetails>
  </Accordion>
  );
};

export {
  AccordionTemp,
  AccordionShare,
  AccordionCo2,
  AccordionMethane,
  AccordionNitrous,
  AccordionArctic,
  AccordionOcean,
};
