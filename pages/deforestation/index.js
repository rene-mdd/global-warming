/* eslint-disable */ 
import React, { useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import Observer from "@researchgate/react-intersection-observer";
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
import StickyMenu from "../../components/semantic/sticky";
import SiteHeader from "../../components/siteHeader";

const CognitiveServicesCredentials =
  require("ms-rest-azure").CognitiveServicesCredentials;

const azureEnvKey = process.env.API_KEY_AZURE;
const credentials = new CognitiveServicesCredentials(`${azureEnvKey}`);
const searchTerm = "deforestation";
const NewsSearchAPIClient = require("azure-cognitiveservices-newssearch");

const client = new NewsSearchAPIClient(credentials);

function SemanticDeforestation(props) {
  const [intersecting, setIntersecting] = useState(false);

  const handleIntersection = (event) => {
    if (event.isIntersecting) {
      setIntersecting(true);
    }
  };

  const { googleNewsJson, azureJson } = props;
  const options = {
    onChange: handleIntersection,
  };

  const parsedGNews = googleNewsJson.articles;
  const parsedBingNews = azureJson.value;
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

      <Container fluid id="landing-page-deforestation">
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
            <Grid.Row centered>
              <Image src="images/forest.png" size="tiny" />
              <Header as="h2" id="h2-news">
                This section is meant to gather data about the current worldwide
                forests situation. This is done through APIs, databases, news,
                MapBuilders, and journals.
              </Header>
            </Grid.Row>
          </Grid>
          <Grid centered className="icon-style">
            <Grid.Row centered>
              <Scroll.Link spy smooth duration={1000} to="jump-news">
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
              <Grid.Row centered>
                <Container>
                  {" "}
                  <Embed
                    as="iframe"
                    style={{
                      width: "800px",
                      height: "800px",
                      padding: 0,
                    }}
                    frameBorder="0"
                    src="https://glad.earthengine.app/view/global-forest-change#dl=1;old=off;bl=off;lon=20;lat=10;zoom=3;"
                  />
                </Container>

                <Container>
                  <span>
                    Credits: University of Maryland, department of geographical
                    sciences.
                  </span>
                </Container>
                <Container id="deforestation-text" textAlign="left">
                  <>
                    <p>
                      Results from time-series analysis of Landsat images
                      characterizing forest extent and change.
                    </p>
                    <p>
                      Trees are defined as vegetation taller than 5m in height
                      and are expressed as a percentage per output grid cell as
                      ‘2000 Percent Tree Cover’. ‘Forest Cover Loss’ is defined
                      as a stand-replacement disturbance, or a change from a
                      forest to non-forest state, during the period 2000–2019.
                      ‘Forest Cover Gain’ is defined as the inverse of loss, or
                      a non-forest to forest change entirely within the period
                      2000–2012. ‘Forest Loss Year’ is a disaggregation of total
                      ‘Forest Loss’ to annual time scales.
                    </p>
                    <p>
                      Reference 2000 and 2019 imagery are median observations
                      from a set of quality assessment-passed growing season
                      observations.
                    </p>
                  </>
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
            <span id="news-date">{`Live: ${new Date().toString()}`}</span>
          </Observer>
        </Header>
        <Divider />
        <Item.Group divided>
          {duplicateRemovalGNews.map((obj) => (
            <Item key={obj.title}>
              <Item.Image
                src={obj?.image ?? "/images/breaking-news.png"}
                alt="Breaking news"
              />
              <Item.Content>
                <Item.Header src={obj.url} target="_blank">
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
                        {" "}
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
                  size="tiny"
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
                        <Label>{`Date: ${obj.datePublished}`}</Label>
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
                          {" "}
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
SemanticDeforestation.propTypes = {
  googleNewsJson: PropTypes.shape({
    articleCount: PropTypes.number,
    articles: PropTypes.arrayOf(PropTypes.shape({})),
    timestamp: PropTypes.number,
  }),
  azureJson: PropTypes.shape({
    totalEstimatedMatches: PropTypes.number,
    value: PropTypes.arrayOf(PropTypes.shape({})),
    _type: PropTypes.string,
  }),
};

SemanticDeforestation.defaultProps = {
  googleNewsJson: PropTypes.shape({
    articleCount: "",
    articles: PropTypes.arrayOf("/images/breaking-news.jpg"),
    timestamp: 0,
  }),
  azureJson: PropTypes.shape({
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
  const gNewsVariable = process.env.API_KEY_GOOGLE;
  const gNewsResp = await axios.get(
    `https://gnews.io/api/v4/search?q=%22deforestation%22&lang=en&image=required&token=${gNewsVariable}`
  );

  const googleNewsJson = JSON.parse(JSON.stringify(gNewsResp.data));
  const azureJson = JSON.parse(JSON.stringify(resp));

  res.setHeader(
    "Cache-Control",
    "maxage=43200, s-maxage=43200, stale-while-revalidate"
  ); // Vercel Cache (Network)

  return {
    props: {
      googleNewsJson,
      azureJson,
    },
  };
}

export default SemanticDeforestation;
