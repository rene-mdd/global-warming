
import _ from 'lodash'
import React from 'react'
import { Accordion, Label, Message } from 'semantic-ui-react'
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
  WorkplaceShareButton
} from "react-share";
import {
  EmailIcon,
  FacebookIcon,
  FacebookMessengerIcon,
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
  WeiboIcon,
  WhatsappIcon,
  WorkplaceIcon
} from "react-share";

const share = ([
  <FacebookShareButton children={<FacebookIcon />} url="https://global-warming-azure.vercel.app/" />,
  <EmailShareButton children={<EmailIcon />} url="https://global-warming-azure.vercel.app/" />]
)

const panelTemp = _.times(1, (i) => ({
  key: `panel-${i}`,
  title: {
    content: <Label content={"Get API"} className="accordion-temp" />,
  },
  content: {
    content: (
      <Message
        info
        header={"Global Monthly Mean Surface Temperature Change"}
        content={"This API provide on a monthly basis, the global mean surface temperature anomaly from 1880.04 to present (in celsius). Fetch this endpoint https://www.global-warming.org/temperature-api and you will get the info in JSON format."}
      />
    ),
  },
}))

const panelCo2 = _.times(1, (i) => ({
  key: `panel-${i}`,
  title: {
    content: <Label content={"Get API"} className="accordion-co2" />,
  },
  content: {
    content: (
      <Message
        info
        header={"Daily global seasonal cycle and trend value"}
        content={"This APi provide on a quasi-daily basis, the amount of carbon dioxide in the atmosphere from 2010.01.01. CO2 is expressed as a mole fraction in dry air, parts per million (ppm). Fetch this endpoint https://www.global-warming.org/co2-api and you will get the info in JSON format"}
      />
    ),
  },
}))

const panelMethane = _.times(1, (i) => ({
  key: `panel-${i}`,
  title: {
    content: <Label content={"Get API"} className="accordion-methane" />,
  },
  content: {
    content: (
      <Message
        info
        header={"Globally averaged marine surface monthly mean data"}
        content={"This API provide on a monthly basis, the amount of methane in the atmosphere from 1983. Expressed as a mole fraction in dry air, parts per million (ppm). Fetch this endpoint https://www.global-warming.org/methane-api and you will get the info in JSON format."}
      />
    ),
  },
}))

const panelNitrous = _.times(1, (i) => ({
  key: `panel-${i}`,
  title: {
    content: <Label content={"Get API"} className="accordion-nitrous" />,
  },
  content: {
    content: (
      <Message
        info
        header={"Nitrous averaged marine surface monthly mean data"}
        content={"This API provide on a monthly basis, the amount of methane in the atmosphere from 1983. Expressed as a mole fraction in dry air, parts per million (ppm). Fetch this endpoint https://www.global-warming.org/methane-api and you will get the info in JSON format."}
      />
    ),
  },
}))

const panelArctic = _.times(1, (i) => ({
  key: `panel-${i}`,
  title: {
    content: <Label content={"Get API"} className="accordion-arctic" />,
  },
  content: {
    content: (
      <Message
        info
        header={"Arctic averaged marine surface monthly mean data"}
        content={"This API provide on a monthly basis, the amount of methane in the atmosphere from 1983. Expressed as a mole fraction in dry air, parts per million (ppm). Fetch this endpoint https://www.global-warming.org/methane-api and you will get the info in JSON format."}
      />
    ),
  },
}))


const panelShare = _.times(1, (i) => ({
  key: `panel-${i}`,
  title: {
    content: <Label content={"Get API"} className="accordion-arctic" />,
  },
  content: {
    content: (
      <EmailShareButton children={share} />
    )
  },
}))

const AccordionTem = () => (
  <Accordion defaultActiveIndex={1} panels={panelTemp} />
);

const AccordionCo2 = () => (
  <Accordion defaultActiveIndex={1} panels={panelCo2} />
)

const AccordionMethane = () => (
  <Accordion defaultActiveIndex={1} panels={panelMethane} />
);

const AccordionNitrous = () => (
  <Accordion defaultActiveIndex={1} panels={panelNitrous} />
);

const AccordionArctic = () => (
  <Accordion defaultActiveIndex={1} panels={panelArctic} />
);

const AccordionShare = () => (
  <Accordion defaultActiveIndex={1} panels={panelShare} />
);




export { AccordionTem, AccordionCo2, AccordionMethane, AccordionNitrous, AccordionArctic, AccordionShare }