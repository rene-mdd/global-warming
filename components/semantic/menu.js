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
      secondary: "#47C072",
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
    this.screenSize = window.matchMedia("(max-width: 800px)");
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
          <BurgerMenu className="menu-mobile-group">
            <Container id="home" className="menu-item">
              <Link href="/">Home</Link>
            </Container>
            <Container id="about" className="menu-item">
              <Link href="/about">About</Link>
            </Container>
            <Container id="business" className="menu-item">
              <Link href="/business">Business</Link>
            </Container>
            <Container id="news" className="menu-item">
              <Link href="/news">News</Link>
            </Container>
            <Container id="deforestation" className="menu-item">
              <Link href="/deforestation">Deforestation</Link>
            </Container>
            <Container id="donate" className="menu-item mobile-donate-btn">
              <Link href="/donate">Donate</Link>
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
                <Toolbar sx={{ justifyContent: "space-between" }}>
                  <ButtonGroup>
                    <Link href="/">
                      <Avatar
                        sx={{ width: "50px" }}
                        src="images/logo-planet-image.png"
                        className="menu-icon"
                      />
                    </Link>
                  </ButtonGroup>
                  <ButtonGroup
                    variant="text"
                    size="large"
                    className="menu-center-group"
                  >
                    <Link href="/">
                      <Button className="menu">Home</Button>
                    </Link>
                    <Link href="/about">
                      <Button className="menu">About</Button>
                    </Link>
                    <Link href="/business">
                      <Button className="menu">Business</Button>
                    </Link>
                    <Link href="/news">
                      <Button className="menu">News</Button>
                    </Link>
                    <Link href="/deforestation">
                      <Button className="menu">Deforestation</Button>
                    </Link>
                  </ButtonGroup>
                  <ButtonGroup className="donate-contact-group">
                    <Link href="/donate">
                      <Button className="menu donate-btn">Donate</Button>
                    </Link>
                    <Link href="/contact">
                      <Button className="menu">Contact</Button>
                    </Link>
                  </ButtonGroup>
                </Toolbar>
              </AppBar>
            </Box>
          </ThemeProvider>
        )}
      </>
    );
  }
}
