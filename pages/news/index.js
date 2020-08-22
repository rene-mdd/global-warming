import * as Scroll from 'react-scroll'
import StickyMenu from '../../components/semantic/sticky'
import {
  Container,
  Header,
  Grid,
  Image,
  Button,
  Divider,
  Item,
  Label
} from 'semantic-ui-react'
import axios from 'axios'
import SiteHeader from '../../components/siteHeader'

const CognitiveServicesCredentials = require('ms-rest-azure')
  .CognitiveServicesCredentials;
  let azureEnvKey = process.env.API_KEY_AZURE;
  console.log(azureEnvKey)
let credentials = new CognitiveServicesCredentials(
  `${azureEnvKey}`
)
let search_term = 'global warming'
const NewsSearchAPIClient = require('azure-cognitiveservices-newssearch')
let client = new NewsSearchAPIClient(credentials)

class News extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      gNews: []
    }
  }

  render () {
    const parsedGNews = this.props.gData.articles
    const parsedBingNews = this.props.data.value
    const duplicateRemovalBing = parsedBingNews.filter(
      (thing, index, self) =>
        index ===
        self.findIndex(
          t => t.description === thing.description || t.name === thing.name
        )
    )
    const duplicateRemovalGNews = parsedGNews.filter(
      (thing, index, self) =>
        index ===
        self.findIndex(
          t => t.description === thing.description || t.title === thing.title
        )
    )
    console.log(duplicateRemovalGNews)
    return (
      <>
      <SiteHeader />
        <StickyMenu />

        <Container fluid={true} id='landing-page-news'>
          <Container>
            <Header as='h1' textAlign='center' className='h1-news'>
              Global Warming & Climate Change World News
            </Header>
            <Grid columns='equal'>
              <Grid.Row centered={true}>
                <Image src='images/icons8-news-256.png' size='tiny' />
                <Header as='h2' id='h2-news'>
                  Up to date worldwide news about Global Warming and Climate
                  Change. This section includes information from small and
                  mainstream firms.
                </Header>
              </Grid.Row>
            </Grid>
            <Grid centered>
              <Grid.Row centered>
               
                  <Scroll.Link
                    spy={true}
                    smooth={true}
                    duration={1000}
                    to='jump-to-news'
                  >
                    <Button className='icon-style' basic>
                      <Image src='/images/icons-double-down.png' />
                    </Button>
                  </Scroll.Link>
               
              </Grid.Row>
            </Grid>
          </Container>
        </Container>
        <Divider name='jump-to-news' />
        <Container>
          <Header as='h3' id='list-news' textAlign='center'>
            News List
          </Header>
          <Header as='h4' textAlign='center'>
            Live: <span id='news-date'>{new Date().toString()}</span>
          </Header>
          <Divider />
          <Item.Group divided>
            {duplicateRemovalGNews.map((obj, index) => {
              return (
                <Item key={'gNews:' + index}>
                  <Item.Image
                    src={(obj?.image && obj.image) || this.forceUpdate()}
                  />
                  <Item.Content style={{borderLeft: '1px solid #C8C8C8'}}>
                    <Item.Header as='header' src={obj.url} target='_blank'>
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
            })}
            <Divider />
            {duplicateRemovalBing.map((obj, index) => {
              return (
                <Item key={'bing:' + index}>
                  <Item.Image
                    style={{ width: '100px' }}
                    src={
                      obj?.image?.thumbnail?.contentUrl ??
                      obj?.provider[0]?.image?.thumbnail?.contentUrl ??
                      '/images/breaking-news.png'
                    }
                  />
                  <Item.Content style={{borderLeft: '1px solid #C8C8C8'}}>
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
                        floated='right'
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
  const gNewsVariable = process.env.API_KEY_GOOGLE;
  const gNewsResp = await axios.get(
    `https://gnews.io/api/v3/search?q=%22climate%20change%22&lang=en&image=required&token=${gNewsVariable}`
  )
  const gJson = JSON.parse(JSON.stringify(gNewsResp.data))
  const gData = await gJson

  const json = JSON.parse(JSON.stringify(resp))
  const data = await json

  res.setHeader(
    'Cache-Control',
    'maxage=43200, s-maxage=43200, stale-while-revalidate'
  ) // Vercel Cache (Network)

  return { props: { data, gData } }
}

export default News
