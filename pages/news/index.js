import * as Scroll from "react-scroll";
import StickyMenu from "../../components/semantic/sticky";
import {
  Container,
  Header,
  Grid,
  Image,
  Button,
  Divider,
  Item,
  Label,
} from "semantic-ui-react";
import axios from "axios";
import SiteHeader from "../../components/siteHeader";
import Observer from "@researchgate/react-intersection-observer";
import PropTypes from "prop-types";

const CognitiveServicesCredentials = require("ms-rest-azure")
  .CognitiveServicesCredentials;
let azureEnvKey = process.env.API_KEY_AZURE;
let credentials = new CognitiveServicesCredentials(`${azureEnvKey}`);
let search_term = "global warming";
const NewsSearchAPIClient = require("azure-cognitiveservices-newssearch");
let client = new NewsSearchAPIClient(credentials);

class News extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      gNews: [],
      intersecting: false,
    };
  }

  handleIntersection = (event) => {
    if (event.isIntersecting) {
      this.setState({ intersecting: true });
    }
  };

  componentWillUnmount() {
    this.forceUpdate();
  }

  render() {
    const options = {
      onChange: this.handleIntersection,
    };

    const parsedGNews = this.props.gJson.articles;
    const parsedBingNews = this.props.jsonAzure.value;
    const duplicateRemovalBing = parsedBingNews.filter(
      (thing, index, self) =>
        index ===
        self.findIndex(
          (t) => t.description === thing.description || t.name === thing.name
        )
    );
    const duplicateRemovalGNews = parsedGNews.filter(
      (thing, index, self) =>
        index ===
        self.findIndex(
          (t) => t.description === thing.description || t.title === thing.title
        )
    );
    const newsMetaTitle = "Global warming & climate change news.";
    const newsMetaDescription =
      "Live worldwide news about global warming and climate change.";
    const newsKeywords =
      "Global warming, climate change, news, environment, green house gases";
    return (
      <>
        <SiteHeader
          description={newsMetaDescription}
          title={newsMetaTitle}
          keywords={newsKeywords}
        />
        <StickyMenu />

        <Container fluid={true} className="landing-page-news">
          <Container>
            <Header as="h1" textAlign="center" className="h1-news">
              Global Warming & Climate Change World News
            </Header>
            <Grid columns="equal">
              <Grid.Row centered={true}>
                <Image src="images/icons8-news-256.png" size="tiny" />
                <Header as="h2" id="h2-news">
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
                  to="jump-to-news"
                >
                  <Button className="icon-style" basic>
                    <Image src="/images/icons-double-down.png" />
                  </Button>
                </Scroll.Link>
              </Grid.Row>
            </Grid>
          </Container>
        </Container>
        <Divider name="jump-to-news" className="hide-divider" />
        <Container>
          <Header as="h3" id="list-news" textAlign="center">
            News List
          </Header>
          <Header as="h4" textAlign="center">
            Live:
            <Observer {...options}>
              <span id="news-date">Live: {new Date().toString()}</span>
            </Observer>
          </Header>
          <Divider />
          <Item.Group divided>
            {duplicateRemovalGNews.map((obj, index) => {
              return (
                <Item key={"gNews:" + index}>
                  <Item.Image
                    src={obj?.image ?? (this.forceUpdate(), "/images/breaking-news.png")}
                  />
                  <Item.Content>
                    <Item.Header as="header" src={obj.url} target="_blank">
                      <a href={obj.url}>{obj.title} </a>
                    </Item.Header>
                    <Item.Meta content={obj.author} />
                    <Item.Description>
                      <p>{obj.description}</p>
                    </Item.Description>
                    <Item.Extra style={{ paddingTop: "45px" }}>
                      <Grid columns="equal" centered stackable>
                        <Grid.Column textAlign="center" verticalAlign="middle">
                          <Label>Date: {obj.publishedAt}</Label>
                        </Grid.Column>
                        <Grid.Column textAlign="center">
                          <Button
                            as="a"
                            href={obj.url}
                            target="_blank"
                            inverted={true}
                            className="news-button"
                            size="small"
                          >
                            {" "}
                            <Image
                              inline={true}
                              size="mini"
                              className="news-icon"
                              src="images/icons8-location-96.png"
                            />{" "}
                            {obj.source.name ?? "News"}{" "}
                          </Button>
                        </Grid.Column>
                      </Grid>
                    </Item.Extra>
                  </Item.Content>
                </Item>
              );
            })}
            <Divider />{" "}
            {this.state.intersecting &&
              duplicateRemovalBing.map((obj, index) => {
                return (
                  <Item key={"bing:" + index}>
                    <Item.Image
                      style={{ width: "100px" }}
                      src={
                        obj?.image?.thumbnail?.contentUrl ??
                        obj?.provider[0]?.image?.thumbnail?.contentUrl ??
                        "/images/breaking-news.png"
                      }
                    />
                    <Item.Content>
                      <Item.Header src={obj.url} target="_blank">
                        <a href={obj.url}>{obj.name} </a>
                      </Item.Header>
                      <Item.Meta content={obj.provider.name} />
                      <Item.Description>
                        <p>{obj.description}</p>
                      </Item.Description>
                      <Item.Extra style={{ paddingTop: "45px" }}>
                        <Grid columns="equal" centered stackable>
                          <Grid.Column
                            textAlign="center"
                            verticalAlign="middle"
                          >
                            <Label>Date: {obj.datePublished}</Label>
                          </Grid.Column>
                          <Grid.Column textAlign="center">
                            <Button
                              as="a"
                              href={obj.url}
                              target="_blank"
                              inverted={true}
                              className="news-button"
                              size="small"
                            >
                              {" "}
                              <Image
                                inline={true}
                                size="mini"
                                className="news-icon"
                                src="images/icons8-location-96.png"
                              />{" "}
                              {obj?.provider[0]?.name ?? "News"}{" "}
                            </Button>
                          </Grid.Column>
                        </Grid>
                      </Item.Extra>
                    </Item.Content>
                  </Item>
                );
              })}{" "}
          </Item.Group>
        </Container>
      </>
    );
  }
}
News.propTypes = {
  gJson: PropTypes.shape({
    articleCount: PropTypes.number,
    articles: PropTypes.arrayOf(PropTypes.object),
    timestamp: PropTypes.number,
  }),
  jsonAzure: PropTypes.shape({
    totalEstimatedMatches: PropTypes.number,
    value: PropTypes.arrayOf(PropTypes.object),
    _type: PropTypes.string,
  }),
};

export async function getServerSideProps({ res }) {
  const resp = await client.newsOperations.search(search_term, {
    market: "en-XA",
    count: 100,
  });

  const jsonAzure = await JSON.parse(JSON.stringify(resp));

  const gNewsVariable = process.env.API_KEY_GOOGLE;
  const gNewsResp = await axios.get(
    `https://gnews.io/api/v3/search?q=%22climate%20change%22&lang=en&image=required&token=${gNewsVariable}`
  );
  const gJson = JSON.parse(JSON.stringify(gNewsResp.data));

  res.setHeader(
    "Cache-Control",
    "maxage=43200, s-maxage=43200, stale-while-revalidate"
  ); // Vercel Cache (Network)

  return {
    props: {
      jsonAzure,
      gJson,
    },
  };
}

export default News;
