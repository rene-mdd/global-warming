import StickyMenu from "../../components/semantic/sticky";
import * as Scroll from "react-scroll";
import {
  Container,
  Header,
  Grid,
  Image,
  Button,
  Divider,
  Item,
  Label,
  Embed,
} from "semantic-ui-react";
import axios from "axios";
import SiteHeader from "../../components/siteHeader";
import Observer from "@researchgate/react-intersection-observer";
import PropTypes from "prop-types";

const CognitiveServicesCredentials = require("ms-rest-azure")
  .CognitiveServicesCredentials;
let azureEnvKey = process.env.API_KEY_AZURE;
let credentials = new CognitiveServicesCredentials(`${azureEnvKey}`);
let search_term = "deforestation";
const NewsSearchAPIClient = require("azure-cognitiveservices-newssearch");
let client = new NewsSearchAPIClient(credentials);

class SemanticDeforestation extends React.Component {
  state = {
    toggle: true,
    gNews: [],
    intersecting: false,
  };

  handleForest = () => {
    this.setState({
      toggle: !this.state.toggle,
    });
  };

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
    const parsedBingNews = this.props.azureJson.value;
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
    const deforestationTitle = "Global deforestation news and map.";
    const deforestationMetaDescription =
      "Live news about worldwide deforestation and map builder to check on global forest loss.";
    const deforestationKeywords =
      "Deforestation, global warming, climate change, environment";

    return (
      <>
        <SiteHeader
          description={deforestationMetaDescription}
          title={deforestationTitle}
          keywords={deforestationKeywords}
        />
        <StickyMenu />

        <Container fluid={true} id="landing-page-deforestation">
          <Container>
            <Header
              as="h1"
              textAlign="center"
              className="h1-id"
              id="h1-deforestation"
            >
              Global Forest Loss
            </Header>
            <Grid columns="equal">
              <Grid.Row centered={true}>
                <Image src="images/forest.png" size="tiny" />
                <Header as="h2" id="h2-news">
                  This section is meant to gather data about the current
                  worldwide forests situation. This is done through APIs,
                  databases, news, MapBuilders, and journals.
                </Header>
              </Grid.Row>
            </Grid>
            <Grid centered className="icon-style">
              <Grid.Row centered>
                <Scroll.Link
                  spy={true}
                  smooth={true}
                  duration={1000}
                  to="jump-news"
                >
                  <Button basic className="icon-style">
                    <Image src="/images/icons-double-down.png" />
                  </Button>
                </Scroll.Link>
              </Grid.Row>
            </Grid>
          </Container>
        </Container>
        <Divider name="jump-news" className="hide-divider" />
        <Container>
          <Grid fluid={true.toString()} className="temperature-background">
            <Container>
              <Header as="h2" className="h2-general" textAlign="center">
                Global forest loss map
              </Header>
              <Grid column="equal" centered>
                <Button
                  onClick={this.handleForest}
                  style={{ marginBottom: "20px" }}
                >
                  {this.state.toggle
                    ? "Deforestation by divided year"
                    : "Deforestation between 2000 - 2019"}{" "}
                </Button>
                <Grid.Row centered>
                  <Container>
                    {" "}
                    {this.state.toggle ? (
                      <Embed
                        as="iframe"
                        style={{
                          width: "800px",
                          height: "800px",
                          padding: 0,
                        }}
                        frameBorder="0"
                        src="https://earthenginepartners.appspot.com/science-2013-global-forest?hl=en&llbox=47.89%2C-24.5%2C33.63%2C-108.13&t=ROADMAP&layers=layer0%2C15%3A100%2C6%2Clayer12%2Clayer9%3A100%2C3%3A100&embedded=true"
                      />
                    ) : (
                      <Embed
                        as="iframe"
                        style={{
                          width: "800px",
                          height: "800px",
                          padding: 0,
                        }}
                        frameBorder="0"
                        scrolling="no"
                        marginHeight="0"
                        marginWidth="0"
                        title="Forest loss copy"
                        src="https://earthenginepartners.appspot.com/science-2013-global-forest?hl=en&llbox=16.12%2C-23.01%2C-37.45%2C-108.34&t=ROADMAP&layers=layer0%2C15%3A100%2C6%2Clayer12%2Clayer9%3A100%2C1%3A100&embedded=true"
                      />
                    )}{" "}
                  </Container>

                  <Container>
                    <span>Credits: University of Maryland, department of geographical sciences.</span>
                  </Container>
                  <Container id="deforestation-text" textAlign="left">
                    {this.state.toggle ? (<>
                      <p>Results from time-series analysis of Landsat images characterizing forest extent and change.</p>
                      <p>
                      Trees are defined as vegetation taller than 5m in height and are expressed as a percentage per output grid cell as ‘2000 Percent Tree Cover’. ‘Forest Cover Loss’ is defined as a stand-replacement disturbance, or a change from a forest to non-forest state, during the period 2000–2019. ‘Forest Cover Gain’ is defined as the inverse of loss, or a non-forest to forest change entirely within the period 2000–2012. ‘Forest Loss Year’ is a disaggregation of total ‘Forest Loss’ to annual time scales.
                      </p>
                      <p>Reference 2000 and 2019 imagery are median observations from a set of quality assessment-passed growing season observations. </p>
                    </>) : (<>
                        <p>Results from time-series analysis of Landsat images characterizing forest extent and change.</p>
                        <p>
                        Trees are defined as vegetation taller than 5m in height and are expressed as a percentage per output grid cell as ‘2000 Percent Tree Cover’. ‘Forest Cover Loss’ is defined as a stand-replacement disturbance, or a change from a forest to non-forest state, during the period 2000–2019. ‘Forest Cover Gain’ is defined as the inverse of loss, or a non-forest to forest change entirely within the period 2000–2012. ‘Forest Loss Year’ is a disaggregation of total ‘Forest Loss’ to annual time scales.
                        </p>
                        <p>Reference 2000 and 2019 imagery are median observations from a set of quality assessment-passed growing season observations.</p>
                    </>)}{" "}
                  </Container>
                </Grid.Row>
              </Grid>
            </Container>
            <Divider />
          </Grid>
        </Container>
        <Container>
          <Header as="h3" id="list-news" textAlign="center">
            News List
          </Header>
          <Header as="h4" textAlign="center">
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
                    src={obj?.image ?? "/images/breaking-news.png"}
                  />
                  <Item.Content style={{ borderLeft: "1px solid #C8C8C8" }}>
                    <Item.Header src={obj.url} target="_blank">
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
                      size="tiny"
                      src={
                        obj?.image?.thumbnail?.contentUrl ??
                        obj?.provider[0]?.image?.thumbnail?.contentUrl ??
                        "/images/breaking-news.png"
                      }
                    />
                    <Item.Content style={{ borderLeft: "1px solid #C8C8C8" }}>
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
SemanticDeforestation.propTypes = {
  gJson: PropTypes.shape({
    articleCount: PropTypes.number,
    articles: PropTypes.arrayOf(PropTypes.object),
    timestamp: PropTypes.number,
  }),
  azureJson: PropTypes.shape({
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
  const gNewsVariable = process.env.API_KEY_GOOGLE;
  const gNewsResp = await axios.get(
    `https://gnews.io/api/v3/search?q=%22deforestation%22&lang=en&image=required&token=${gNewsVariable}`
  );

  const gJson = JSON.parse(JSON.stringify(gNewsResp.data));
  const azureJson = JSON.parse(JSON.stringify(resp));

  res.setHeader(
    "Cache-Control",
    "maxage=43200, s-maxage=43200, stale-while-revalidate"
  ); // Vercel Cache (Network)

  return {
    props: {
      gJson,
      azureJson,
    },
  };
}

export default SemanticDeforestation;
