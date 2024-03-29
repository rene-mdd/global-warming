import React, { useRef, useState } from "react";
import {
  Container,
  Grid,
  CardMedia,
  MenuList,
  Paper,
  MenuItem,
  Button,
} from "@mui/material";
import * as Scroll from "react-scroll";

export default function SideBar() {
  const [activeItem, setActiveItem] = useState("");
  // const [menuVisible, setMenuVisible] = useState(true);
  const [rotate, setRotate] = useState(false);

  const scrollRef = useRef("nofollow");

  const handleClick = () => {
    // setMenuVisible((prevState) => !prevState);
    setRotate((prevState) => !prevState);
  };

  return (
    <>
      <Container className="fix">
        <Grid container columns={1}>
          <Button onClick={() => handleClick()}>
            <CardMedia
              className="side-menu-icon"
              alt="rotate"
              image="images/icons8-more-than-60.png"
              id={rotate ? "rotate-right" : "rotate-left"}
            />
          </Button>
          <Paper
            component="nav"
            className={rotate ? "sidebar-config-out" : "sidebar-config-in"}
          >
            <MenuList className="position-relative">
              <Scroll.Link
                to="jump-to-temperature"
                spy
                smooth
                offset={0}
                duration={1000}
                ref={scrollRef}
              >
                <MenuItem
                  sx={{ opacity: activeItem === "temperature" ? "0.7" : "1" }}
                  onClick={() => setActiveItem("temperature")}
                  className="white-color"
                >
                  Temperature
                </MenuItem>
              </Scroll.Link>
              <Scroll.Link
                to="jump-to-co2"
                spy
                smooth
                offset={0}
                duration={1000}
                ref={scrollRef}
              >
                <MenuItem
                  sx={{ opacity: activeItem === "co2" ? "0.7" : "1" }}
                  onClick={() => setActiveItem("co2")}
                  className="white-color"
                >
                  Carbon Dioxide
                </MenuItem>
              </Scroll.Link>
              <Scroll.Link
                to="jump-to-methane"
                spy
                smooth
                offset={0}
                duration={1000}
                ref={scrollRef}
              >
                <MenuItem
                  sx={{ opacity: activeItem === "methane" ? "0.7" : "1" }}
                  onClick={() => setActiveItem("methane")}
                  className="white-color"
                >
                  Methane
                </MenuItem>
              </Scroll.Link>
              <Scroll.Link
                to="jump-to-nitrous"
                spy
                smooth
                offset={0}
                duration={1000}
                ref={scrollRef}
              >
                <MenuItem
                  sx={{ opacity: activeItem === "nitrous" ? "0.7" : "1" }}
                  onClick={() => setActiveItem("nitrous")}
                  className="white-color"
                >
                  Nitrous Oxide
                </MenuItem>
              </Scroll.Link>
              <Scroll.Link
                to="jump-to-arctic"
                spy
                smooth
                offset={0}
                duration={1000}
                ref={scrollRef}
              >
                <MenuItem
                  sx={{ opacity: activeItem === "arctic" ? "0.7" : "1" }}
                  onClick={() => setActiveItem("arctic")}
                  className="white-color"
                >
                  Polar Ice
                </MenuItem>
              </Scroll.Link>
              <Scroll.Link
                to="jump-to-ocean"
                spy
                smooth
                offset={0}
                duration={1000}
                ref={scrollRef}
              >
                <MenuItem
                  sx={{ opacity: activeItem === "ocean" ? "0.7" : "1" }}
                  onClick={() => setActiveItem("ocean")}
                  className="white-color"
                >
                  Ocean warming
                </MenuItem>
              </Scroll.Link>
            </MenuList>
          </Paper>
        </Grid>
      </Container>
    </>
  );
}
