import React, { useState } from "react";
import { Menu, Sidebar, Sticky, Rail, Grid } from "semantic-ui-react";
import * as Scroll from "react-scroll";

export default function SideBar() {
  const [activeItem, setActiveItem] = useState("");
  const [menuVisible, setMenuVisible] = useState(true);
  const [rotate, setRotate] = useState(false);

  const handleClick = () => {
    setMenuVisible((prevState) => !prevState);
    setRotate((prevState) => !prevState);
  };

  return (
    <>
      <Sticky className="chart-img--remove">
        <Rail className="fix">
          <Grid columns={1}>
            <Grid.Column className="close-button" width="1">
              <Menu secondary attached="top" className="sidebar-button">
                <Menu.Item
                  style={{ margin: "42px 0 -20px 0" }}
                  onClick={() => handleClick()}
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
                className={rotate ? "sidebar-config-out" : "sidebar-config-in"}
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
                      onClick={(e, { name }) => setActiveItem(name)}
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
                      onClick={(e, { name }) => setActiveItem(name)}
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
                      onClick={(e, { name }) => setActiveItem(name)}
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
                      onClick={(e, { name }) => setActiveItem(name)}
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
                      onClick={(e, { name }) => setActiveItem(name)}
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
