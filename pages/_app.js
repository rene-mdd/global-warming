/* eslint-disable */
import "../global-styles/main.scss";
import PropTypes from "prop-types";
import "../global-styles/burger-menu.scss";
import NextNProgress from "nextjs-progressbar";
import 'normalize.css/normalize.css';

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
  pageProps: PropTypes.shape({}),
};

MyApp.defaultProps = {
  Component: PropTypes.func,
  pageProps: PropTypes.shape({}),
};
