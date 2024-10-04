import Head from "next/head";
import PropTypes from "prop-types";

export default function SiteHeader({ title, description, keyword }) {
  return (
    <>
      <Head>
        <title>{title}</title>
        <script type="text/javascript" data-cmp-ab="1" src="https://cdn.consentmanager.net/delivery/js/semiautomatic.min.js" data-cmp-cdid="83e6be9c61a9a" data-cmp-host="c.delivery.consentmanager.net" data-cmp-cdn="cdn.consentmanager.net" data-cmp-codesrc="0" />
        <meta property="og:url" content="https://global-warming.org/" />
        <meta property="og:title" content="Global Warming Data and API" />
        <meta property="og:image" content="images/logo-planet-image.png" />
        <meta property="og:image:width" content="75" />
        <meta property="og:image:height" content="75" />
        <meta property="og:image:type" content="image/png" />
        <meta name="description" content={description} />
        <meta name="keywords" content={keyword} />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
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
    "Global warming & climate change up to date APIs, data, graphs, and news. Earth's temperature, carbon dioxide (CO2), methane, nitrous oxide, melted polar ice cap or sea ice extent, and ocean warming.",
  keyword: "Global warming, climate change, API, graphs",
};
