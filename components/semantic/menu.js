import React, { Component } from "react";
// import { Container, Image, Menu } from "semantic-ui-react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
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
import { withRouter } from "next/router";
import PropTypes from "prop-types";
import { slide as BurgerMenu } from "react-burger-menu";
import { DICTIONARIES } from "../../lib/i18n";
import {
  DEFAULT_LOCALE,
  isTranslated,
  linkLocale,
  rememberLocale,
} from "../../lib/i18n-config";

const theme = createTheme({
  palette: {
    primary: {
      main: "#ffffff",
      secondary: "#47C072",
    },
  },
});

class StickySideBar extends Component {
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

  // Same page in the other language. Only offered where that version is
  // translated, so the switcher never links to a noindex page.
  languageSwitch(className) {
    const { router } = this.props;
    const { locale = DEFAULT_LOCALE, pathname, asPath } = router;
    if (!isTranslated(pathname)) return null;
    const t = DICTIONARIES[locale].menu;
    const target = locale === DEFAULT_LOCALE ? "de" : DEFAULT_LOCALE;
    return (
      <Link
        href={asPath}
        locale={target}
        hrefLang={target}
        lang={target}
        aria-label={t.otherLanguageAria}
        onClick={() => rememberLocale(target)}
        className={className}
      >
        {className ? (
          t.otherLanguage
        ) : (
          <Button className="menu">{t.otherLanguageShort}</Button>
        )}
      </Link>
    );
  }

  render() {
    const { mediaQuery } = this.state;
    const { router } = this.props;
    const locale = router.locale ?? DEFAULT_LOCALE;
    const t = DICTIONARIES[locale].menu;
    // Pages without a German version link to English rather than to an
    // untranslated /de page.
    const loc = (path) => linkLocale(path, locale);
    return (
      <>
        {mediaQuery ? (
          // mobile menu
          <BurgerMenu className="menu-mobile-group">
            <Container id="home" className="menu-item">
              <Link href="/" locale={loc("/")}>
                {t.home}
              </Link>
            </Container>
            <Container id="about" className="menu-item">
              <Link href="/about" locale={loc("/about")}>
                {t.about}
              </Link>
            </Container>
            <Container id="business" className="menu-item">
              <Link href="/esg" locale={loc("/esg")}>
                {t.esg}
              </Link>
            </Container>
            <Container id="news" className="menu-item">
              <Link href="/news" locale={loc("/news")}>
                {t.news}
              </Link>
            </Container>
            <Container id="deforestation" className="menu-item">
              <Link href="/deforestation" locale={loc("/deforestation")}>
                {t.deforestation}
              </Link>
            </Container>
            <Container id="traffic" className="menu-item">
              <Link href="/traffic" locale={loc("/traffic")}>
                {t.traffic}
              </Link>
            </Container>
            <Container id="donate" className="menu-item mobile-donate-btn">
              <Link href="/donate" locale={loc("/donate")}>
                {t.donate}
              </Link>
            </Container>
            <Container id="contact" className="menu-item">
              <Link href="/contact" locale={loc("/contact")}>
                {t.contact}
              </Link>
            </Container>
            {isTranslated(router.pathname) && (
              <Container id="language" className="menu-item">
                {this.languageSwitch("menu-language")}
              </Container>
            )}
            <Container id="social-media-container" className="menu-item">
              <Link
                href="https://www.linkedin.com/company/climate-accountability-api/"
                aria-label={t.linkedinAria}
              >
                {" "}
                <LinkedInIcon
                  fontSize="large"
                  sx={{ margin: "9px 25px 0 0", color: "white" }}
                />
              </Link>
            </Container>
          </BurgerMenu>
        ) : (
          // desktop menu
          <ThemeProvider theme={theme}>
            <Box>
              <AppBar position="fixed" color="primary">
                <Toolbar sx={{ justifyContent: "space-between" }}>
                  <ButtonGroup>
                    <Link href="/" locale={loc("/")}>
                      <Avatar
                        sx={{ width: "50px" }}
                        src="/images/logo-planet-image.png"
                        className="menu-icon"
                      />
                    </Link>
                  </ButtonGroup>
                  <ButtonGroup
                    variant="text"
                    size="large"
                    className="menu-center-group"
                  >
                    <Link href="/" locale={loc("/")}>
                      <Button className="menu">{t.home}</Button>
                    </Link>
                    <Link href="/about" locale={loc("/about")}>
                      <Button className="menu">{t.about}</Button>
                    </Link>
                    <Link href="/esg" locale={loc("/esg")}>
                      <Button className="menu">{t.esg}</Button>
                    </Link>
                    <Link href="/news" locale={loc("/news")}>
                      <Button className="menu">{t.news}</Button>
                    </Link>
                    <Link href="/deforestation" locale={loc("/deforestation")}>
                      <Button className="menu">{t.deforestation}</Button>
                    </Link>
                    <Link href="/traffic" locale={loc("/traffic")}>
                      <Button className="menu">{t.traffic}</Button>
                    </Link>
                  </ButtonGroup>
                  <Box className="donate-contact-group">
                    <Button>
                      <Link
                        href="https://www.linkedin.com/company/climate-accountability-api/"
                        aria-label={t.linkedinAria}
                      >
                        <LinkedInIcon
                          sx={{ paddingTop: "6px", color: "#0A66C2" }}
                        />
                      </Link>
                    </Button>
                    <Link href="/donate" locale={loc("/donate")}>
                      <Button className="donate-btn">{t.donate}</Button>
                    </Link>
                    <Link href="/contact" locale={loc("/contact")}>
                      <Button className="menu">{t.contact}</Button>
                    </Link>
                    {this.languageSwitch()}
                  </Box>
                </Toolbar>
              </AppBar>
            </Box>
          </ThemeProvider>
        )}
      </>
    );
  }
}

StickySideBar.propTypes = {
  router: PropTypes.shape({
    locale: PropTypes.string,
    pathname: PropTypes.string,
    asPath: PropTypes.string,
  }).isRequired,
};

export default withRouter(StickySideBar);
