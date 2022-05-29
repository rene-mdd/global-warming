/* eslint-disable */
import React, { Component } from "react";
// import { Container, Image, Menu } from "semantic-ui-react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import {
  Container,
  Box,
  AppBar,
  Toolbar,
  Button,
  Avatar,
  ButtonGroup,
} from "@mui/material";
import Link from "next/link";
import { slide as BurgerMenu } from "react-burger-menu";

const theme = createTheme({
  palette: {
    primary: {
      main: "#ffffff",
    },
  },
});

export default class StickySideBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mediaQuery: false,
    };
    this.screenSize = "";
  }

  componentDidMount() {
    this.screenSize = window.matchMedia("(max-width: 600px)");
    this.setState({ mediaQuery: this.screenSize.matches });
    window.addEventListener("resize", this.checkFunc);
  }

  checkFunc = () => {
    const { mediaQuery } = this.state;
    if (this.screenSize.matches !== mediaQuery) {
      this.setState({ mediaQuery: this.screenSize.matches });
    }
  };

  render() {
    const { mediaQuery } = this.state;
    return (
      <>
        {mediaQuery ? (
          <BurgerMenu>
            <Container id="home" className="menu-item">
              <Link href="/">Home</Link>
            </Container>
            <Container id="about" className="menu-item">
              <Link href="/about">About</Link>
            </Container>
            <Container id="news" className="menu-item">
              <Link href="/news">News</Link>
            </Container>
            <Container id="deforestation" className="menu-item">
              <Link href="/deforestation">Deforestation</Link>
            </Container>
            <Container id="contact" className="menu-item">
              <Link href="/contact">Contact</Link>
            </Container>
          </BurgerMenu>
        ) : (
          // desktop menu
          <ThemeProvider theme={theme}>
            <Box>
              <AppBar position="fixed" color="primary">
                <Toolbar sx={{ justifyContent: "center" }}>
                  <Link href="/">
                    <Avatar
                      sx={{ width: "50px" }}
                      src="images/logo-planet-image.png"
                      className="menu-icon"
                    />
                  </Link>
                  <ButtonGroup variant="text" size="large">
                    <Link href="/">
                      <Button color="inherit" className="menu">
                        Home
                      </Button>
                    </Link>
                    <Link href="/about">
                      <Button color="inherit" className="menu">
                        About
                      </Button>
                    </Link>
                    <Link href="/news">
                      <Button color="inherit" className="menu">
                        News
                      </Button>
                    </Link>
                    <Link href="/deforestation">
                      <Button color="inherit" className="menu">
                        Deforestation
                      </Button>
                    </Link>
                  </ButtonGroup>
                  <Link href="/contact">
                    <Button
                      color="inherit"
                      className="menu"
                      sx={{ marginLeft: "auto" }}
                    >
                      Contact
                    </Button>
                  </Link>
                </Toolbar>
              </AppBar>
            </Box>
          </ThemeProvider>
        )}
      </>
    );
  }
}
