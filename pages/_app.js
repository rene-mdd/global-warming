/* eslint-disable react/jsx-props-no-spreading */
import "../global-styles/main.css";
import PropTypes from "prop-types";
import "semantic-ui-css/semantic.min.css";
import "../global-styles/burger-menu.css";
import NextNProgress from "../helpers/index";

export default function MyApp({ Component, pageProps }) {
  return (
    <>
      <NextNProgress />
      <Component {...pageProps} />
    </>
  );
}

MyApp.propTypes = {
  Component: PropTypes.func,
  pageProps: PropTypes.objectOf(),
};

MyApp.defaultProps = {
  Component: PropTypes.func,
  pageProps: PropTypes.objectOf(),
};
