import React from "react";
import { Container, Header, Grid, Button, Menu } from "semantic-ui-react";
import Arctic from "../arctic";
import { AccordionArctic, AccordionShare } from "./accordion";

class SemanticArctic extends React.Component {
  constructor(props) {
    super(props);
    this.state = { arctic: false, arcticLoading: "arcticBtn" };
  }

  toggleArctic = () => {
    this.setState((prevState) => ({ arctic: !prevState.arctic }));
  };

  handleClickArctic = (isLoading) => {
    if (isLoading) {
      this.setState({ arcticLoading: "loading" });
    } else {
      this.setState({ arcticLoading: "arcticBtn" });
    }
  };

  // handleIntersection = (event) => {
  //   const intersectingCo2Result = event.isIntersecting;
  //   if (intersectingCo2Result) {
  //     this.setState({ siteView: "arctic" });
  //   }
  // };

  render() {
    const { arctic, arcticLoading } = this.state;
    return (
      <Container as="section" fluid>
        <Container>
          <Header as="h2" textAlign="center" className="h2-general">
            Melted Polar Ice Caps
          </Header>
          <Grid container>
            <Grid.Row centered stretched>
              {arctic ? (
                <Arctic
                  arcticLoadingCallback={(loading) => {
                    this.handleClickArctic(loading);
                  }}
                />
              ) : null}
            </Grid.Row>
            <Grid.Row centered>
              <Grid.Column width="eight" textAlign="center">
                <Button
                  onClick={this.toggleArctic}
                  className={arcticLoading}
                  id={arcticLoading}
                >
                  {arctic ? "Hide graph" : "Load graph"}
                </Button>
              </Grid.Column>
            </Grid.Row>
          </Grid>
          <Grid columns="equal">
            <Container id="scrolling-container">
              <p>
                The arctic is warming around twice as fast as global average.
                Some of the reasons for this are: The arctic amplification, the
                albedo effect, and black carbon. From 1979 to 1996, we lost 2.2
                – 3% of the arctic ice cover. From 2010 to present we are losing
                12.85% per decade!
              </p>

              <p>
                Another consequence is permafrost thawing, this is a process in
                which large amounts of methane is released to the atmosphere,
                fueling more the process of global warming.
              </p>
              <p>
                For details please visit:&nbsp;
                <a href="https://www.npolar.no/en/themes/climate-change-in-the-arctic/#toggle-id-8">
                  Climate change in the Arctic
                </a>
                <span> and </span>
                <a href="https://www.igsoc.org/annals/46/a46a005.pdf">
                  Recent air-temperature changes in the Arctic
                </a>
                .
              </p>
              <Grid className="api-segment" columns="equal" centered stackable>
                <Grid.Column>
                  <AccordionArctic />
                </Grid.Column>
                <Grid.Column>
                  <AccordionShare />
                </Grid.Column>
              </Grid>
            </Container>
          </Grid>
        </Container>
        <Container as="footer" textAlign="center">
          <Menu.Item>
            <p>
              {`Copyright ©${new Date().getFullYear()}
              René Rodríguez. All Rights Reserved`}
            </p>
          </Menu.Item>
        </Container>
      </Container>
    );
  }
}

export default SemanticArctic;
