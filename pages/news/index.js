
import * as Scroll from 'react-scroll';
import Head from 'next/head'
import StickyMenu from "../../semantic/sticky"
import { Container, Header, Grid, Image, Button, Divider, Item, Label } from 'semantic-ui-react'
import axios from "axios";

const CognitiveServicesCredentials = require('ms-rest-azure').CognitiveServicesCredentials;
let credentials = new CognitiveServicesCredentials('3058a5d1d023401b9fcc6336eb9ee58d');
let search_term = 'global warming'
const NewsSearchAPIClient = require('azure-cognitiveservices-newssearch');
let client = new NewsSearchAPIClient(credentials);

class News extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      gNews: [],
    };
  }


  render() {
   
    console.log(this.props)
    const parsedGNews = this.props.gData.articles;
    const parsedBingNews = this.props.data.value;

    const duplicateRemovalBing = parsedBingNews.filter((thing, index, self) =>
      index === self.findIndex((t) => (
        t.description === thing.description || t.name === thing.name
      ))
    )
    const duplicateRemovalGNews = parsedGNews.filter((thing, index, self) =>
      index === self.findIndex((t) => (
        t.description === thing.description || t.title === thing.title
      ))
    )
    return (<>
      <Head>
        <title>Global Warming News</title>
        <link rel="icon" href="/favicon.ico" />
        <link rel="stylesheet" type="text/css" href="path/to/chartjs/dist/Chart.min.css" />
        <link rel="stylesheet" href="//cdn.jsdelivr.net/npm/semantic-ui@2.4.2/dist/semantic.min.css" />
        <link href="https://fonts.googleapis.com/css2?family=Play&display=swap" rel="stylesheet" />
        {/* <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.4.1/semantic.min.css" /> */}
        <meta name="description" content="Global Warming and Climate Change live API, data, graphs, and news." />
      </Head>
      <StickyMenu />
      

      <Container fluid={true} id="landing-page-news">
      <Container >
          <Header as="h1" textAlign="center"  className="h1-news">
          Global Warming & Climate Change World News
          </Header>
    <Grid columns="equal">
      <Grid.Row centered={true}>
        <Image src="images/icons8-news-256.png" size="tiny" />
        <Header as="h2" id="h2-news">
      Up to date worldwide news about Global Warming and Climate Change.
              This section includes information from small and mainstream firms.
      </Header>
      </Grid.Row>
    
    
    </Grid>
     <Grid centered>
        <Grid.Row centered>
            <Grid.Column width="4" textAlign="center">
            <Scroll.Link spy={true} smooth={true} duration={1000} to="jump-to-news" >
                <Button className="icon-style" basic>
                  <Image src="/images/icons-double-down.png" />
                </Button>
              </Scroll.Link>
            </Grid.Column>
            </Grid.Row>
    </Grid>
    
  </Container>
  </Container>
      <Divider name="jump-to-news" />
      < Container >
      <Header as="h3" id="list-news" textAlign="center">
        List
      </Header>
      <Header as="h4" textAlign="center">
        Live: <span id="news-date">{new Date().toString()}</span>
      </Header>
      <Divider />
      <Item.Group divided>
        {duplicateRemovalGNews.map((obj, index) => {
          return (
          <Item key={'gNews:' + index}>
          <Item.Image src={obj?.image && obj.image || this.forceUpdate()} />
          <Item.Content>
          <Item.Header src={obj.url} target="_blank">
          <a href={obj.url} target="_blank">
                      {obj.title}
                    </a>
          </Item.Header>
          <Item.Meta content={obj.author} />
          <Item.Description>
          <p>{obj.description}</p>
          </Item.Description>
          <Item.Extra style={{paddingTop: "45px"}}>
          <Label >Date: {obj.publishedAt}</Label>
     
          <a href={obj.url} target="_blank"><Button inverted={true} className="news-button" size="small"  floated="right"> <Image centered size="mini" className="news-icon" src="images/icons8-location-96.png"  />{obj.source.name ?? "News"}</Button></a>
          </Item.Extra>
        </Item.Content>
        </Item>)
        })
        }
        <Divider />
        {duplicateRemovalBing.map((obj, index) => {
          return (
            <Item key={'bing:' + index}>
            <Item.Image style={{width:"100px"}} src={obj?.image?.thumbnail?.contentUrl ?? obj?.provider[0]?.image?.thumbnail?.contentUrl ?? "/images/breaking-news.png"} />
            <Item.Content>
            <Item.Header src={obj.url} target="_blank">
            <a href={obj.url} target="_blank">
            {obj.name}
                      </a>
            </Item.Header>
            <Item.Meta content={obj.provider.name} />
            <Item.Description>
            <p>{obj.description}</p>
            </Item.Description>
            <Item.Extra style={{paddingTop: "45px"}}>
            <Label >Date: {obj.datePublished}</Label>
            <a href={obj.url} target="_blank"><Button inverted={true} className="news-button" size="small"  floated="right"> <Image centered size="mini" className="news-icon" src="images/icons8-location-96.png"  />{obj?.provider[0]?.name ?? "News"}</Button></a>
            </Item.Extra>
          </Item.Content>
          </Item>)
        })}
      </Item.Group>
      </Container>
     
      </>
    );
  }
}

export async function getServerSideProps({ res }) {
  const resp = await client.newsOperations.search(search_term, {
    market: "en-XA",
    count: 100,
  });

  const gNewsResp = await axios.get('https://gnews.io/api/v3/search?q="climate change"&lang=en&image=required&token=a6e3927e03b68f9e1b73d16124863e92');
  const gJson = JSON.parse(JSON.stringify(gNewsResp.data));
  const gData = await gJson;

  const json = JSON.parse(JSON.stringify(resp));
  const data = await json;

  res.setHeader(
    "Cache-Control",
    "maxage=43200, s-maxage=43200, stale-while-revalidate"
  ); // Vercel Cache (Network)

  return { props: { data, gData } };
}

export default News;
