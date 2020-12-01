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
  WhatsappShareButton
} from 'react-share'
import {
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
  WhatsappIcon
} from 'react-share'

const share = [
  <FacebookShareButton
    
    url='https://global-warming.org/'
    key='facebook'
  ><FacebookIcon size={50} borderRadius={5} /></FacebookShareButton>,
  <EmailShareButton
    
    url='https://global-warming.org/'
    key='email'
  ><EmailIcon size={50} borderRadius={5} /></EmailShareButton>,
  <InstapaperShareButton
    
    url='https://global-warming.org/'
    key='instagram'
  ><InstapaperIcon size={50} borderRadius={5} /></InstapaperShareButton>,
  <LineShareButton
    url='https://global-warming.org/'
    key='line'
  ><LineIcon size={50} borderRadius={5} /></LineShareButton>,
  <LinkedinShareButton
    url='https://global-warming.org/'
    key='linkedin'
  ><LinkedinIcon size={50} borderRadius={5} /></LinkedinShareButton>,
  <LivejournalShareButton
    url='https://global-warming.org/'
    key='liveJournal'
  ><LivejournalIcon size={50} borderRadius={5} /></LivejournalShareButton>,
  <MailruShareButton
    url='https://global-warming.org/'
    key='mailRu'
  ><MailruIcon size={50} borderRadius={5} /></MailruShareButton>,
  <OKShareButton
    url='https://global-warming.org/'
    key='ok'
  ><OKIcon size={50} borderRadius={5} /></OKShareButton>,
  <PinterestShareButton
    media='https://global-warming.org/api/chart-img/tempChart.jpeg'
    url='https://global-warming.org/'
    key='pinterest'
  ><PinterestIcon size={50} borderRadius={5} /></PinterestShareButton>,
  <PocketShareButton
    url='https://global-warming.org/'
    key='pocket'
  ><PocketIcon size={50} borderRadius={5} /></PocketShareButton>,
  <RedditShareButton
    url='https://global-warming.org/'
    key='reddit'
  ><RedditIcon size={50} borderRadius={5} /></RedditShareButton>,
  <TumblrShareButton
    url='https://global-warming.org/'
    key='tumblr'
  ><TumblrIcon size={50} borderRadius={5} /></TumblrShareButton>,
  <TwitterShareButton
    url='https://global-warming.org/'
    key='twitter'
  ><TwitterIcon size={50} borderRadius={5} /></TwitterShareButton>,
  <ViberShareButton
    url='https://global-warming.org/'
    key='viber'
  ><ViberIcon size={50} borderRadius={5} /></ViberShareButton>,
  <VKShareButton
    url='https://global-warming.org/'
    key='vk'
  ><VKIcon size={50} borderRadius={5} /></VKShareButton>,
  <WhatsappShareButton
    url='https://global-warming.org/'
    key='whatsapp'
  ><WhatsappIcon size={50} borderRadius={5} /></WhatsappShareButton>,
  <TelegramShareButton
    url='https://global-warming.org/'
    key='telegram'
  ><TelegramIcon size={50} borderRadius={5} /></TelegramShareButton>
]

const panelTemp = _.times(1, i => ({
  key: `panel-${i}`,
  title: {
    content: <Label content={'Get API'} className='accordion-temp' />
  },
  content: {
    content: (
      <Message info>
        <Message.Header as='header'>
          <p>Global Monthly Mean Surface Temperature Change</p>
        </Message.Header>
        <Message.Content className='api-content'>
          <p>
            This API provides on a monthly basis, the global mean surface
            temperature anomaly from 1880.04 to the present (in celsius). Fetch
            this endpoint <b>https://global-warming.org/api/temperature-api</b>{' '}
            and you will get the info in JSON format.
          </p>
        </Message.Content>
      </Message>
    )
  }
}))

const panelCo2 = _.times(1, i => ({
  key: `panel-${i}`,
  title: {
    content: <Label content={'Get API'} className='accordion-co2' />
  },
  content: {
    content: (
      <Message info>
        <Message.Header as='header'>
          <p>Daily global seasonal cycle and trend value</p>
        </Message.Header>
        <Message.Content className='api-content'>
          <p>
            This API provides on a quasi-daily basis, the amount of carbon
            dioxide (CO2) in the atmosphere from 2010.01.01 to the present. It
            is expressed as a mole fraction in dry air, parts per million (ppm).
            Fetch this endpoint <b>https://global-warming.org/api/co2-api</b>{' '}
            and you will get the info in JSON format
          </p>
        </Message.Content>
      </Message>
    )
  }
}))

const panelMethane = _.times(1, i => ({
  key: `panel-${i}`,
  title: {
    content: <Label content={'Get API'} className='accordion-methane' />
  },
  content: {
    content: (
      <Message info>
        <Message.Header as='header'>
          <p>Globally averaged marine surface monthly mean data</p>
        </Message.Header>
        <Message.Content className='api-content'>
          <p>
            This API provides on a monthly basis, the amount of methane in the
            atmosphere from 1983 to the present. Expressed as a mole fraction in
            dry air, parts per million (ppm). Fetch this endpoint{' '}
            <b>https://global-warming.org/api/methane-api</b> and you will get
            the info in JSON format.
          </p>
        </Message.Content>
      </Message>
    )
  }
}))

const panelNitrous = _.times(1, i => ({
  key: `panel-${i}`,
  title: {
    content: <Label content={'Get API'} className='accordion-nitrous' />
  },
  content: {
    content: (
      <Message info>
        <Message.Header as='header'>
          <p>Nitrous averaged marine surface monthly mean data</p>
        </Message.Header>
        <Message.Content className='api-content'>
          <p>
            This API provides on a monthly basis, the amount of nitrous oxide in
            the atmosphere from 2001 to the present. Expressed as a mole fraction in dry air,
            parts per million (ppm). Fetch this endpoint{' '}
            <b>https://global-warming.org/api/nitrous-oxide-api</b> and you will
            get the info in JSON format.
          </p>
        </Message.Content>
      </Message>
    )
  }
}))

const panelArctic = _.times(1, i => ({
  key: `panel-${i}`,
  title: {
    content: <Label content={'Get API'} className='accordion-arctic' />
  },
  content: {
    content: (
      <Message info>
        <Message.Header as='header'>
          <p>Arctic averaged marine surface yearly mean data</p>
        </Message.Header>
        <Message.Content className='api-content'>
          <p>
            This API provides the average monthly arctic sea ice extent each
            September since 1979, derived from satellite observations. Fetch
            this endpoint <b>https://global-warming.org/api/arctic-api</b> and
            you will get the info in JSON format.{' '}
          </p>
        </Message.Content>
      </Message>
    )
  }
}))

const panelShare = _.times(1, i => ({
  key: `panel-${i}`,
  title: {
    content: <Label content={'Share'} className='accordion-arctic' />
  },
  content: {
    content: share
  }
}))

const AccordionTemp = () => (
  <Accordion defaultActiveIndex={1} panels={panelTemp} />
)

const AccordionCo2 = () => (
  <Accordion defaultActiveIndex={1} panels={panelCo2} />
)

const AccordionMethane = () => (
  <Accordion defaultActiveIndex={1} panels={panelMethane} />
)

const AccordionNitrous = () => (
  <Accordion defaultActiveIndex={1} panels={panelNitrous} />
)

const AccordionArctic = () => (
  <Accordion defaultActiveIndex={1} panels={panelArctic} />
)

const AccordionShare = () => (
  <Accordion as='div' defaultActiveIndex={1} panels={panelShare} />
)

export {
  AccordionTemp,
  AccordionCo2,
  AccordionMethane,
  AccordionNitrous,
  AccordionArctic,
  AccordionShare
}
