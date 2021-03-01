import React, { Component } from "react";
import { Container, Image, Menu } from "semantic-ui-react";
import Link from "next/link";
import { slide as BurgerMenu } from "react-burger-menu";

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
        {" "}
        {mediaQuery ? (
          <BurgerMenu>
            <Container id="home" className="menu-item">
              <Link href="/">Home</Link>
            </Container>
            <Container id="about" className="menu-item">
              <Link href="/news">News</Link>
            </Container>
            <Container id="contact" className="menu-item">
              <Link href="/deforestation">Deforestation</Link>
            </Container>
            <Container id="deforestation" className="menu-item">
              <Link href="/contact">Contact</Link>
            </Container>
          </BurgerMenu>
        ) : (
          // desktop menu
          <Menu
            as="header"
            fixed="top"
            size="huge"
            className="chart-img--remove"
          >
            <Container as="nav">
              <Link href="/" passHref>
                <Menu.Item as="a" position="left">
                  <Image size="mini" src="images/logo-planet-image.png" />
                </Menu.Item>
              </Link>
              <Link href="/" passHref>
                <Menu.Item as="a">Home</Menu.Item>
              </Link>
              <Link href="/news" passHref>
                <Menu.Item as="a">News</Menu.Item>
              </Link>
              <Link href="/deforestation" passHref>
                <Menu.Item as="a">Deforestation</Menu.Item>
              </Link>
              <Link href="/contact" passHref>
                <Menu.Item position="right">Contact</Menu.Item>
              </Link>
            </Container>
          </Menu>
        )}
      </>
    );
  }
}
