import StickyMenu from '../../components/semantic/sticky'
import * as Scroll from 'react-scroll'
import {
  Container,
  Header,
  Grid,
  Image,
  Button,
  Divider,
  Item,
  Label,
  Embed
} from 'semantic-ui-react'
import axios from 'axios'
import SiteHeader from '../../components/siteHeader'

const CognitiveServicesCredentials = require('ms-rest-azure')
  .CognitiveServicesCredentials
let credentials = new CognitiveServicesCredentials(
  '3058a5d1d023401b9fcc6336eb9ee58d'
)
let search_term = 'deforestation'
const NewsSearchAPIClient = require('azure-cognitiveservices-newssearch')
let client = new NewsSearchAPIClient(credentials)

class SemanticDeforestation extends React.Component {
  state = { toggle: false, gNews: [] }
  handleForest = () => {
    this.setState({ toggle: !this.state.toggle })
  }

  render () {
    // const parsedGNews = this.props.gData.articles
    const parsedBingNews = this.props.data.value

    const duplicateRemovalBing = parsedBingNews.filter(
      (thing, index, self) =>
        index ===
        self.findIndex(
          t => t.description === thing.description || t.name === thing.name
        )
    )
    // const duplicateRemovalGNews = parsedGNews.filter(
    //   (thing, index, self) =>
    //     index ===
    //     self.findIndex(
    //       t => t.description === thing.description || t.title === thing.title
    //     )
    // )

    return (
      <>
        <SiteHeader />
        <StickyMenu />

        <Container fluid={true} id='landing-page-deforestation'>
          <Container>
            <Header
              as='h1'
              textAlign='center'
              className='h1-id'
              id='h1-deforestation'
            >
              Global Forest Loss
            </Header>
            <Grid columns='equal'>
              <Grid.Row centered={true}>
                <Image src='images/forest.png' size='tiny' />
                <Header as='h2' id='h2-news'>
                  This section is meant to gather data about the current
                  worldwide forests situation. This is done through APIs,
                  databases, news, MapBuilders, and journals.
                </Header>
              </Grid.Row>
            </Grid>
            <Grid centered className='icon-style'>
              <Grid.Row centered>
                <Scroll.Link
                  spy={true}
                  smooth={true}
                  duration={1000}
                  to='jump-news'
                >
                  <Button basic>
                    <Image src='/images/icons-double-down.png' />
                  </Button>
                </Scroll.Link>
              </Grid.Row>
            </Grid>
          </Container>
        </Container>
        <Divider name='jump-news' />
        <Container>
          <Grid fluid={true.toString()} className='temperature-background'>
            <Container>
              <Header as='h2' className='h2-general' textAlign='center'>
                Global forest loss from 2000 to 2014
              </Header>
              <Grid column='equal' centered>
                <Button
                  onClick={this.handleForest}
                  style={{ marginBottom: '20px' }}
                >
                  {this.state.toggle
                    ? 'Show 2001 - 2014 deforestation'
                    : 'Use Global Forest Watch map'}
                </Button>
                <Grid.Row centered>
                  
                  <Container>
                    {this.state.toggle ? (
                      <Embed
                        as='iframe'
                        style={{ width: '800px', height: '800px', padding: 0  }}
                        frameBorder='0'
                        src='https://my.gfw-mapbuilder.org/v1.latest/?appid=e53c3a031fa6479ab09ef9171ee91c03'
                      />
                    ) : (
                      <Embed
                        as='iframe'
                        style={{ width: '800px', height: '800px', padding: 0 }}
                        frameBorder='0'
                        scrolling='no'
                        marginHeight='0'
                        marginWidth='0'
                        title='Forest loss copy'
                        src='//www.arcgis.com/apps/Embed/index.html?webmap=ed33972acffc4e7c9b260c753f1a6bd4&extent=-157.4447,-41.8564,177.9459,71.6&home=true&zoom=true&previewImage=false&scale=true&search=true&searchextent=true&disable_scroll=false&theme=light'
                      />
                    )}
                  </Container>

                  <Container>
                    <span>Credits: Hansen, UMD, Google, USGS, NASA</span>
                  </Container>
                  <Container id='deforestation-text' textAlign='left'>
                    {this.state.toggle ? (
                      <p>
                        This is a custom map builder, where you can check on
                        different features like tree cover loss and gain,
                        <b> deforestation alert system</b> that monitors forest
                        cover loss and forest degradation in the Brazilian
                        Amazon and the globe, areas of likely tree cover loss in
                        near-real time, and more...
                      </p>
                    ) : (
                      <p>
                        This data set provides a disaggregation of total forest
                        loss to annual time scales. Encoded as either 0 (no
                        loss) or else a value in the range 1–14, representing
                        loss detected primarily in the year 2001–2014,
                        respectively. This global dataset contain unsigned 8-bit
                        values and have a spatial resolution of 1 arc-second per
                        pixel, or approximately 30 meters per pixel at the
                        equator. Quantification of global forest change has been
                        lacking despite the recognized importance of forest
                        ecosystem services. In this data, Earth observation
                        satellite data were used to map global forest loss (2.3
                        million square kilometers) and gain (0.8 million square
                        kilometers) from 2000 to 2012 at a spatial resolution of
                        30 meters. The tropics were the only climate domain to
                        exhibit a trend, with forest loss increasing by 2101
                        square kilometers per year. Brazil’s well-documented
                        reduction in deforestation was offset by increasing
                        forest loss in Indonesia, Malaysia, Paraguay, Bolivia,
                        Zambia, Angola, and elsewhere. Intensive forestry
                        practiced within subtropical forests resulted in the
                        highest rates of forest change globally. Boreal forest
                        loss due largely to fire and forestry was second to that
                        in the tropics in absolute and proportional terms. These
                        results depict a globally consistent and locally
                        relevant record of forest change. Results from
                        time-series analysis of 654,178 Landsat 7 ETM+ images in
                        characterizing global forest extent and change from 2000
                        through 2012. For additional information about these
                        results, please see the associated journal article (
                        <a
                          href='http://www.sciencemag.org/content/342/6160/850'
                          target='_blank'
                        >
                          http://www.sciencemag.org/content/342/6160/850
                        </a>
                        ) (Hansen et al., Science 2013).{' '}
                      </p>
                    )}
                  </Container>
                </Grid.Row>
              </Grid>
            </Container>
            <Divider />
          </Grid>
        </Container>
        <Container>
          <Header as='h3' id='list-news' textAlign='center'>
            News List
          </Header>
          <Header as='h4' textAlign='center'>
            Live: <span id='news-date'>{new Date().toString()}</span>
          </Header>
          <Divider />
          <Item.Group divided>
            {/* {duplicateRemovalGNews.map((obj, index) => {
              return (
                <Item key={'gNews:' + index}>
                  <Item.Image
                    src={
                      obj?.image
                        ? obj.image
                        : this.forceUpdate() && '/images/breaking-news.png'
                    }
                  />
                  <Item.Content style={{ borderLeft: '1px solid #C8C8C8' }}>
                    <Item.Header src={obj.url} target='_blank'>
                      <a href={obj.url} target='_blank'>
                        {obj.title}
                      </a>
                    </Item.Header>
                    <Item.Meta content={obj.author} />
                    <Item.Description>
                      <p>{obj.description}</p>
                    </Item.Description>
                    <Item.Extra style={{ paddingTop: '45px' }}>
                      <Grid columns='equal' centered stackable>
                        <Grid.Column textAlign='center' verticalAlign='middle'>
                          <Label>Date: {obj.publishedAt}</Label>
                        </Grid.Column>
                        <Grid.Column textAlign='center'>
                          <Button
                            as='a'
                            href={obj.url}
                            target='_blank'
                            inverted={true}
                            className='news-button'
                            size='small'
                          >
                            {' '}
                            <Image
                              inline={true}
                              size='mini'
                              className='news-icon'
                              src='images/icons8-location-96.png'
                            />
                            {obj.source.name ?? 'News'}
                          </Button>
                        </Grid.Column>
                      </Grid>
                    </Item.Extra>
                  </Item.Content>
                </Item>
              )
            })} */}
            <Divider />
            {duplicateRemovalBing.map((obj, index) => {
              return (
                <Item key={'bing:' + index}>
                  <Item.Image
                    size='tiny'
                    src={
                      obj?.image?.thumbnail?.contentUrl ??
                      obj?.provider[0]?.image?.thumbnail?.contentUrl ??
                      '/images/breaking-news.png'
                    }
                  />
                  <Item.Content style={{ borderLeft: '1px solid #C8C8C8' }}>
                    <Item.Header src={obj.url} target='_blank'>
                      <a href={obj.url} target='_blank'>
                        {obj.name}
                      </a>
                    </Item.Header>
                    <Item.Meta content={obj.provider.name} />
                    <Item.Description>
                      <p>{obj.description}</p>
                    </Item.Description>
                    <Item.Extra style={{ paddingTop: '45px' }}>
                      <Grid columns='equal' centered stackable>
                        <Grid.Column textAlign='center' verticalAlign='middle'>
                          <Label>Date: {obj.datePublished}</Label>
                        </Grid.Column>
                        <Grid.Column textAlign='center'>
                          <Button
                            as='a'
                            href={obj.url}
                            target='_blank'
                            inverted={true}
                            className='news-button'
                            size='small'
                          >
                            {' '}
                            <Image
                              inline={true}
                              size='mini'
                              className='news-icon'
                              src='images/icons8-location-96.png'
                            />
                            {obj?.provider[0]?.name ?? 'News'}
                          </Button>
                        </Grid.Column>
                      </Grid>
                    </Item.Extra>
                  </Item.Content>
                </Item>
              )
            })}
          </Item.Group>
        </Container>
      </>
    )
  }
}

export async function getServerSideProps ({ res }) {
  const resp = await client.newsOperations.search(search_term, {
    market: 'en-XA',
    count: 100
  })
  // const gNewsResp = await axios.get(
  //   'https://gnews.io/api/v3/search?q="deforestation"&lang=en&image=required&token=a6e3927e03b68f9e1b73d16124863e92'
  // )

  // const gJson = JSON.parse(JSON.stringify(gNewsResp.data))
  // const gData = await gJson
  const json = JSON.parse(JSON.stringify(resp))
  const data = await json

  res.setHeader(
    'Cache-Control',
    'maxage=43200, s-maxage=43200, stale-while-revalidate'
  ) // Vercel Cache (Network)

  return { props: { data} }
}
export default SemanticDeforestation
