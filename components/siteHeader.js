import Head from "next/head";
import PropTypes from "prop-types";

export default function SiteHeader({ title, description, keyword }) {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta property="og:url" content="https://global-warming.org/" />
        <meta property="og:title" content="Global Warming Data and API" />
        <meta property="og:image" content="images/logo-planet-image.png" />
        <meta property="og:image:width" content="75" />
        <meta property="og:image:height" content="75" />
        <meta property="og:image:type" content="image/png" />
        <meta name="description" content={description} />
        <meta name="keywords" content={keyword} />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        {process.env.NODE_ENV === "development" ? (
          <>
            <link
              rel="shortcut icon"
              type="image/gif"
              href="favicon/favicon.ico"
            />
            <link
              media="print"
              onLoad="this.onload=null;this.removeAttribute('media');"
              href="https://fonts.googleapis.com/css2?family=Play&display=swap"
              rel="stylesheet"
            />
            <link
              media="print"
              onLoad="this.onload=null;this.removeAttribute('media');"
              rel="stylesheet"
              href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
            />
          </>
        ) : null}
      </Head>
    </>
  );
}

SiteHeader.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  keyword: PropTypes.string,
};

SiteHeader.defaultProps = {
  title: "Global Warming API",
  description:
    "Global warming & climate change up to date APIs, data, graphs, and news. Earth's temperature, carbon dioxide (CO2), methane, nitrous oxide, and melted polar ice cap.",
  keyword: "Global warming, climate change, API, graphs",
};
