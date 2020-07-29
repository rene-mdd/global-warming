
import * as Scroll from 'react-scroll';
import Head from 'next/head'
import StickyMenu from "../../semantic/sticky"
import { Container, Header, Grid, Image, Button, Segment, Divider, Item, Label } from 'semantic-ui-react'

const CognitiveServicesCredentials = require('ms-rest-azure').CognitiveServicesCredentials;
let credentials = new CognitiveServicesCredentials('feaf1751d8b142c68ca34b339e04dfbc');
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

  componentDidMount() {
    fetch(
      'https://gnews.io/api/v3/search?q="climate change"&lang=en&image=required&token=a6e3927e03b68f9e1b73d16124863e92'
    )
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        return this.setState({ gNews: data.articles });
      })
      .catch((error) => {
        console.error(error);
      });
  }

  render() {
    console.log(this.state.gNews)
    console.log(this.props)
    const parsedGNews = JSON.parse(JSON.stringify(this.state.gNews))
    const parsedBingNews = this.props.data;

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
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.4.1/semantic.min.css" />
        <meta name="description" content="Global Warming and Climate Change live API, graphs, news, and information." />
      </Head>
      <StickyMenu />

      <Container fluid={true} id="landing-page-news">
      <Container >
          <Header as="h1" textAlign="center"  id="h1-news">
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
                <Button basic>
                  <Image src="/images/icons-double-down.png" />
                </Button>
              </Scroll.Link>
            </Grid.Column>
            </Grid.Row>
    </Grid>
    
  </Container>
  </Container>

      <Divider name="jump-news" />

      < Container >
      <Header as="h3" id="list-news" textAlign="center">
        List
      </Header>
      <Header as="h4" textAlign="center">
        Live: <span id="news-date">{new Date().toString()}</span>
      </Header>
      <Divider />
      <Item.Group divided>
        {duplicateRemovalGNews.map((obj) => {
          return (
          <Item>
          <Item.Image src={obj?.image ?? "/images/breaking-news.png"} />
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
          <a href={obj.url} target="_blank"><Button inverted={true} className="news-button" size="small" compact={true} floated="right"> <img src="images/white-megaphone-102.png" style={{marginRight: "10px",marginBottom: "-5px", width: "15%"}} />{obj.source.name}</Button></a>
          </Item.Extra>
        </Item.Content>
        </Item>)
        })
        }
        <Divider />
        {duplicateRemovalBing.map((obj) => {
          return (
            <Item>
            <Item.Image src={obj?.image?.thumbnail?.contentUrl ?? "/images/breaking-news.png"} />
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
            <a href={obj.url} target="_blank"><Button inverted={true} className="news-button" size="small" compact={true} floated="right"> <img src="images/white-megaphone-102.png" style={{marginRight: "10px",marginBottom: "-5px", width: "15%"}} />{obj.source.name}</Button></a>
            </Item.Extra>
          </Item.Content>
          </Item>)
        })}
      </Item.Group>
      </Container>
      {/* <div className="ui fluid container" id="landing-page-news">
        <div className="ui container" >
          <h1 className="ui center aligned header" id="h1-news">
            World News
        </h1>
          <div className="ui row">
            <img src="images/icons8-news-256.png" className='ui tiny image centered ' />
          </div>
          <h2 className='ui center aligned header' id="h2-news">
            Up to date worldwide news about Global Warming and Climate Change. This section includes information from small and mainstream firms.
        </h2>
          <div className="ui equal width grid icon-style" >
            <div className="row">
              <div className="ui center aligned column">
                <Scroll.Link spy={true} smooth={true} duration={1000} to="jump-news" >
                  <button className="ui button basic center aligned">
                    <img src="/images/icons-double-down.png" />
                  </button>
                </Scroll.Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="ui divider" name="jump-news" />
      <div className="ui container move-down">
      <h3 className="ui center aligned header" id="list-news">List</h3>
    <h4 className="ui center aligned header">Live: <span id='news-date'>{new Date().toString()}</span></h4>
    <div className="ui divider" name="jump-news" />
        <div className="ui items">
          {
            duplicateRemovalGNews.map((obj, index) => {
              return (
                <div className="item" key={"google" + index}>
                  <img className="ui medium middle aligned image" src={obj?.image ?? "/images/breaking-news.png"} />
                  <div className="content">
                    <a href={obj.url} className="header" target="_blank">
                      {obj.title}
                    </a>
                    <div className="meta">{obj.author}</div>
                    <div className="description">
                      <p>{obj.description}</p>
                    </div>
                    <div className="extra">Date: {obj.publishedAt}<div className="ui bottom right attached label">
                      <img src="images/icons8-megaphone-100.png" style={{marginRight: "10px"}} />
                      {obj.source.name}
                    </div></div>
                  </div>
                </div>
              );
            })}
            <div className="ui divider"/>
          {duplicateRemovalBing.map((obj, index) => {
            return (
              <div className="item" key={"bing:" + index}>
                <img className="ui small middle aligned image" src={obj?.image?.thumbnail?.contentUrl ?? "/images/breaking-news.png"} />
                <div className="content">
                  <a href={obj.url} className="header" target="_blank">{obj.name}</a>
                  <div className="meta">{obj.provider.name} </div>
                  <div className="description">
                    <p>{obj.description}</p>
                  </div>
                  <div className="extra">Date: {obj.datePublished}<div className="ui bottom right attached label">
                  <img src="images/icons8-megaphone-100.png" style={{marginRight: "10px"}} />
                    {obj?.provider[0]?.name ?? "News"}
                  </div></div>
                </div>
              );
            })}
          </div>0
        </div> */}
      </>
    );
  }
}

export async function getServerSideProps({ res }) {
  const resp = await client.newsOperations.search(search_term, {
    market: "en-XA",
    count: 100,
  });
  const json = JSON.parse(JSON.stringify(resp));
  const data = await json;

  res.setHeader(
    "Cache-Control",
    "maxage=43200, s-maxage=43200, stale-while-revalidate"
  ); // Vercel Cache (Network)

  return { props: { data } };
}

export default News;
