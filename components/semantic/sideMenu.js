/* eslint-disable react/jsx-curly-newline */
import React from "react";
import { Menu, Sidebar, Sticky, Rail, Grid } from "semantic-ui-react";
import * as Scroll from "react-scroll";

export default class SideBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeItem: "",
      menuVisible: true,
      rotate: false,
    };
  }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name });

  render() {
    const { activeItem, menuVisible, rotate } = this.state;
    return (
      <>
        <Sticky className="chart-img--remove">
          <Rail className="fix">
            <Grid columns={1}>
              <Grid.Column className="close-button" width="1">
                <Menu secondary attached="top" className="sidebar-button">
                  <Menu.Item
                    style={{ margin: "42px 0 -20px 0" }}
                    onClick={() =>
                      this.setState({
                        menuVisible: !menuVisible,
                        rotate: !rotate,
                      })
                    }
                  >
                    <img
                      alt="rotate"
                      src="images/icons8-more-than-60.png"
                      id={rotate ? "rotate-right" : "rotate-left"}
                    />
                  </Menu.Item>
                </Menu>
              </Grid.Column>
              <Grid.Column>
                <Sidebar.Pushable
                  as="nav"
                  className={
                    rotate ? "sidebar-config-out" : "sidebar-config-in"
                  }
                >
                  <Sidebar
                    style={{ cursor: "pointer" }}
                    as={Menu}
                    direction="left"
                    animation="slide along"
                    width="thin"
                    className="sideBar"
                    visible={menuVisible}
                    vertical
                    inverted
                  >
                    <Scroll.Link
                      to="jump-to-temperature"
                      spy
                      smooth
                      offset={0}
                      duration={1000}
                    >
                      <Menu.Item
                        as="div"
                        name="temperature"
                        active={activeItem === "temperature"}
                        onClick={this.handleItemClick}
                      >
                        Temperature
                      </Menu.Item>
                    </Scroll.Link>
                    <Scroll.Link
                      to="jump-to-co2"
                      spy
                      smooth
                      offset={0}
                      duration={1000}
                    >
                      <Menu.Item
                        as="div"
                        name="co2"
                        active={activeItem === "co2"}
                        onClick={this.handleItemClick}
                      >
                        Carbon Dioxide
                      </Menu.Item>
                    </Scroll.Link>
                    <Scroll.Link
                      to="jump-to-methane"
                      spy
                      smooth
                      offset={0}
                      duration={1000}
                    >
                      <Menu.Item
                        as="div"
                        name="methane"
                        active={activeItem === "methane"}
                        onClick={this.handleItemClick}
                      >
                        Methane
                      </Menu.Item>
                    </Scroll.Link>
                    <Scroll.Link
                      to="jump-to-nitrous"
                      spy
                      smooth
                      offset={0}
                      duration={1000}
                    >
                      <Menu.Item
                        as="div"
                        name="nitrous"
                        active={activeItem === "nitrous"}
                        onClick={this.handleItemClick}
                      >
                        Nitrous Oxide
                      </Menu.Item>
                    </Scroll.Link>
                    <Scroll.Link
                      to="jump-to-arctic"
                      spy
                      smooth
                      offset={0}
                      duration={1000}
                    >
                      <Menu.Item
                        as="div"
                        name="arctic"
                        active={activeItem === "arctic"}
                        onClick={this.handleItemClick}
                      >
                        Polar Ice
                      </Menu.Item>
                    </Scroll.Link>
                  </Sidebar>
                </Sidebar.Pushable>
              </Grid.Column>
            </Grid>
          </Rail>
        </Sticky>
      </>
    );
  }
}
