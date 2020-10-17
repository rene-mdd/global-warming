import { Container, Header, Grid } from 'semantic-ui-react'
import Temperature from '../temperature'
import { AccordionTemp, AccordionShare } from '../semantic/accordion'

class SemanticTemperature extends React.Component {
  state = { siteView: ''}
 
  render () {
  
    return (
      <Container as='section' fluid={true} className='temperature-background'>
        <Container>
          <Header as='h2' textAlign='center' className='h2-general'>
            Global temperature anomalies from year 1 to present
          </Header>
          <Grid container={true}>
            <Grid.Row centered stretched>
              {/* <Temperature /> */}
            </Grid.Row>
          </Grid>
          <Grid columns='equal' style={{ marginTop: '7vh' }}>
            <Container>
               <p>
                The current global warming rate is not natural. From 1880 to
                1981 was (0.07°C / 0.13°F) per decade. Since 1981 this rate has
                increased to (0.18°C / 0.32°F){' '}
                <a
                  href='https://www.climate.gov/news-features/understanding-climate/climate-change-global-temperature'
                  target='_blank'
                >
                  <em>Climate Change: Global Temperature</em>
                </a>
                .
              </p>
              <p>
                Some of the past sudden increase on global temperature present
                in this graph, correspond to the Roman Warm Period and the
                Medieval Warm Period. These events were at regional and not
                global scale.{' '}
                <a href='https://www.ipcc.ch/report/ar4/wg1/' target='_blank'>
                  <em>AR4 Climate Change 2007: The Physical Science Basis</em>
                </a>
                . For more information about prehistoric temperature records
                please visit:{' '}
                <a
                  href='https://www.ipcc.ch/site/assets/uploads/2018/02/WG1AR5_Chapter05_FINAL.pdf'
                  target='_blank'
                >
                  <em>Information from Paleoclimate Archives </em>
                </a>
                and
                <a
                  href='https://earthobservatory.nasa.gov/features/GlobalWarming/page3.php'
                  target='_blank'
                >
                  <em> How is Today’s Warming Different from the Past?</em>
                </a>
              </p>
              <p>
                The total average global temperature rise since the industrial
                revolution is around (1.0 °C / 1.8 °F). Earth northern
                hemisphere is warming faster. The arctic has warmed between (2
                °C / 3.6 °F) and (4 °C / 7.2 °F). Please visit these scientific
                publications for more details:{' '}
                <a
                  href='https://www.igsoc.org/annals/46/a46a005.pdf'
                  target='_blank'
                >
                  <em>Recent air-temperature changes in the Arctic</em>
                </a>
                ,{' '}
                <a
                  href='https://web.archive.org/web/20130628144322/http:/www.acia.uaf.edu/pages/scientific.html'
                  target='_blank'
                >
                  <em>ACIA Scientific Report</em>
                </a>
                ,
                <a
                  href='https://www.climatecentral.org/news/in-global-warming-northern-hemisphere-is-outpacing-the-south-15850#:~:text=Berkeley%20and%20the%20University%20of,and%20oceans%20warm%20relatively%20slowly.'
                  target='_blank'
                >
                  <em>
                    In Warming, Northern Hemisphere is Outpacing the South
                  </em>
                </a>
                ,{' '}
                <a
                  href='https://iopscience.iop.org/article/10.1088/1748-9326/aafc1b/pdf'
                  target='_blank'
                >
                 <em>Key indicators of Arctic climate change: 1971–2017</em>
                </a>
                ,
                <a
                  href='https://nsidc.org/cryosphere/arctic-meteorology/climate_change.html'
                  target='_blank'
                >
                  Climate Change in the Arctic
                </a>
                ,{' '}
                <a
                  href='https://www.nature.com/articles/s41467-019-09622-y'
                  target='_blank'
                >
                  <em>Recent summer warming in northwestern Canada exceeds the Holocene thermal maximum</em>
                </a>
                .</p> <p>Earth temperature and the proportion of gases such as Co2,
                methane, and nitrous oxide in the atmosphere is strictly
                correlated. For more information about this topic and
                prehistoric data, please visit:{' '}
                <a
                  href='https://www.nature.com/articles/srep21691'
                  target='_blank'
                >
                  <em>On the causal structure between CO2 and global temperature</em>
                </a>
                ,{' '}
                <a
                  href='https://environmentcounts.org/ec-perspective-accounting-for-800000-years-of-climate-change/'
                  target='_blank'
                >
                  <em>EC Perspective: Accounting for 800,000 years of climate change </em>
                </a>
                and{' '}
                <a
                  href='https://earthobservatory.nasa.gov/features/GlobalWarming/page3.php'
                  target='_blank'
                >
                  <em>How is Today’s Warming Different from the Past?</em>
                </a>
                .
              </p>
              <Grid className='api-segment' columns='equal' centered stackable>
                <Grid.Column>
                  <AccordionTemp />
                </Grid.Column>
                <Grid.Column>
                  <AccordionShare />
                </Grid.Column>
              </Grid>
            </Container>
          </Grid>
        </Container>
      </Container>
    )
  }
}
export default SemanticTemperature
