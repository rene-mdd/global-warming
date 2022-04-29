import Head from "next/head";
import PropTypes from "prop-types";

export default function SiteHeader({ title, description, keyword }) {
  return (
    <>
      <Head>
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=[Tracking ID]"
        />

        <script
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{
            __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'UA-174660681-1');
        `,
          }}
        />
        <title>{title}</title>
        <meta property="og:url" content="https://global-warming.org/" />
        {/* link to live chart api/chart-img/tempChart.jpeg */}
        <meta property="og:title" content="Global Warming Data and API" />
        <meta property="og:image" content="images/share-image.png" />
        <meta property="og:image:width" content="75" />
        <meta property="og:image:height" content="75" />
        <meta property="og:image:type" content="image/png" />
        <meta name="description" content={description} />
        <meta name="keywords" content={keyword} />
        <link rel="shortcut icon" type="image/gif" href="favicon/favicon.ico" />
        <link
          rel="stylesheet"
          href="//cdn.jsdelivr.net/npm/semantic-ui@2.4.2/dist/semantic.min.css"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Play&display=swap"
          rel="stylesheet"
        />
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
