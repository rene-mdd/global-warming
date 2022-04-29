import React, { useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import * as Scroll from "react-scroll";
import Observer from "@researchgate/react-intersection-observer";
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
import StickyMenu from "../../components/semantic/sticky";
import SiteHeader from "../../components/siteHeader";

const CognitiveServicesCredentials =
  require("ms-rest-azure").CognitiveServicesCredentials;

const azureEnvKey = process.env.API_KEY_AZURE;
const credentials = new CognitiveServicesCredentials(`${azureEnvKey}`);
const searchTerm = "global warming";
const NewsSearchAPIClient = require("azure-cognitiveservices-newssearch");

const client = new NewsSearchAPIClient(credentials);

function News(props) {
  const [intersecting, setIntersecting] = useState(false);

  const handleIntersection = (event) => {
    if (event.isIntersecting) {
      setIntersecting(true);
    }
  };

  const { googleNewsJson, jsonAzure } = props;
  const options = {
    onChange: handleIntersection,
  };

  const parsedGNews = googleNewsJson.articles;
  const parsedBingNews = jsonAzure.value;
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

      <Container fluid className="landing-page-news">
        <Container>
          <Header as="h1" textAlign="center" className="h1-news">
            Global Warming & Climate Change World News
          </Header>
          <Grid columns="equal">
            <Grid.Row centered>
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
              <Scroll.Link spy smooth duration={1000} to="jump-to-news">
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
            <span id="news-date">{`Live: ${new Date().toString()}`}</span>
          </Observer>
        </Header>
        <Divider />
        <Item.Group divided>
          {duplicateRemovalGNews.map((obj) => (
            <Item key={obj.title}>
              <Item.Image
                alt="Breaking news"
                src={obj?.image || "/images/breaking-news.jpg"}
              />
              <Item.Content>
                <Item.Header as="header" src={obj.url} target="_blank">
                  <a href={obj.url}>{obj.title}</a>
                </Item.Header>
                <Item.Meta content={obj.author} />
                <Item.Description>
                  <p>{obj.description}</p>
                </Item.Description>
                <Item.Extra style={{ paddingTop: "45px" }}>
                  <Grid columns="equal" centered stackable>
                    <Grid.Column textAlign="center" verticalAlign="middle">
                      <Label>
                        Date:
                        {obj.publishedAt}
                      </Label>
                    </Grid.Column>
                    <Grid.Column textAlign="center">
                      <Button
                        as="a"
                        href={obj.url}
                        target="_blank"
                        inverted
                        className="news-button"
                        size="small"
                      >
                        <Image
                          inline
                          size="mini"
                          className="news-icon"
                          src="images/icons8-location-96.png"
                        />
                        {obj.source.name ?? "News"}
                      </Button>
                    </Grid.Column>
                  </Grid>
                </Item.Extra>
              </Item.Content>
              <Observer {...options}>
                <span />
              </Observer>
            </Item>
          ))}
          <Divider />
          {intersecting &&
            duplicateRemovalBing.map((obj) => (
              <Item key={obj.name}>
                <Item.Image
                  style={{ width: "100px" }}
                  alt="Breaking news"
                  src={
                    obj?.image?.thumbnail?.contentUrl ??
                    obj?.provider[0]?.image?.thumbnail?.contentUrl ??
                    "/images/breaking-news.jpg"
                  }
                />
                <Item.Content>
                  <Item.Header src={obj.url} target="_blank">
                    <a href={obj.url}>{obj.name}</a>
                  </Item.Header>
                  <Item.Meta content={obj.provider.name} />
                  <Item.Description>
                    <p>{obj.description}</p>
                  </Item.Description>
                  <Item.Extra style={{ paddingTop: "45px" }}>
                    <Grid columns="equal" centered stackable>
                      <Grid.Column textAlign="center" verticalAlign="middle">
                        <Label>
                          Date:
                          {obj.datePublished}
                        </Label>
                      </Grid.Column>
                      <Grid.Column textAlign="center">
                        <Button
                          as="a"
                          href={obj.url}
                          target="_blank"
                          inverted
                          className="news-button"
                          size="small"
                        >
                          <Image
                            inline
                            size="mini"
                            className="news-icon"
                            src="images/icons8-location-96.png"
                          />
                          {obj?.provider[0]?.name ?? "News"}
                        </Button>
                      </Grid.Column>
                    </Grid>
                  </Item.Extra>
                </Item.Content>
              </Item>
            ))}
        </Item.Group>
      </Container>
    </>
  );
}
News.propTypes = {
  googleNewsJson: PropTypes.shape({
    articleCount: PropTypes.number,
    articles: PropTypes.arrayOf(PropTypes.shape({})),
    timestamp: PropTypes.number,
  }),
  jsonAzure: PropTypes.shape({
    totalEstimatedMatches: PropTypes.number,
    value: PropTypes.arrayOf(PropTypes.shape({})),
    _type: PropTypes.string,
  }),
};

News.defaultProps = {
  googleNewsJson: PropTypes.shape({
    articleCount: 0,
    articles: PropTypes.arrayOf("/images/breaking-news.jpg"),
    timestamp: 0,
  }),
  jsonAzure: PropTypes.shape({
    totalEstimatedMatches: 0,
    value: PropTypes.arrayOf("/images/breaking-news.jpg"),
    _type: "",
  }),
};

export async function getServerSideProps({ res }) {
  const resp = await client.newsOperations.search(searchTerm, {
    market: "en-XA",
    count: 100,
  });

  const jsonAzure = await JSON.parse(JSON.stringify(resp));

  const gNewsVariable = process.env.API_KEY_GOOGLE;
  const gNewsResp = await axios.get(
    `https://gnews.io/api/v4/search?q=%22climate%20change%22&lang=en&image=required&token=${gNewsVariable}`
  );
  const googleNewsJson = JSON.parse(JSON.stringify(gNewsResp.data));

  res.setHeader(
    "Cache-Control",
    "maxage=43200, s-maxage=43200, stale-while-revalidate"
  ); // Vercel Cache (Network)

  return {
    props: {
      jsonAzure,
      googleNewsJson,
    },
  };
}

export default News;
