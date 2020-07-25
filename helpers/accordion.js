
import _ from 'lodash'
import React from 'react'
import { Accordion, Label, Message } from 'semantic-ui-react'


const panelTemp = _.times(1, (i) => ({
  key: `panel-${i}`,
  title: {
    content: <Label  content={"Get API"} className="accordion-label"/>,
  },
  content: {
    content: (
      <Message
        info
        header={"Global Monthly Mean Surface Temperature Change"}
        content={"This API provide on a monthly basis, the global mean surface temperature anomaly from 1880.04 to present (in celsius). Just fetch this endpoint https//www.global-warming.org/temperature-api and you will get the info in JSON format."}
      />
    ),
  },
}))

const panelCo2 = _.times(1, (i) => ({
    key: `panel-${i}`,
    title: {
      content: <Label  content={"Share"} className="accordion-label"/>,
    },
    content: {
      content: (
        <Message
          info
          header={"Hola"}
          content={"Aqui fuego"}
        />
      ),
    },
  }))

const AccordionTem = () => (
  <Accordion defaultActiveIndex={1} panels={panelTemp} />
);

const AccordionCo2 = () => (
    <Accordion defaultActiveIndex={1} panels={panelCo2} />
  )


export {AccordionTem, AccordionCo2}