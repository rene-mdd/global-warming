
import Head from "next/head";
import PropTypes from "prop-types";

export default function SiteHeader(props) {
        return (<>
     <Head>
     <script
    async
    src="https://www.googletagmanager.com/gtag/js?id=[Tracking ID]"
  />

  <script
    dangerouslySetInnerHTML={{
      __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'UA-174660681-1');
        `,
    }}
  />
          <title>{props.title}</title>
          <meta
            property='og:url'
            content={
              'https://global-warming.org/'
            }
          />
          {/* link to live chart api/chart-img/tempChart.jpeg */}
          <meta property='og:title' content={'Global Warming Data'} />
          <meta property='og:image' content={`images/share-image.png`} />
          <meta property='og:image:width' content='75' />
          <meta property='og:image:height' content='75' />
          <meta property='og:image:type' content='image/png' />
          <meta
            name='description'
            content={props.description}
          />
          <meta name="keywords" content={props.keyword} />
          <link rel='icon' href='/favicon.ico' />
          <link
            rel='stylesheet'
            href='//cdn.jsdelivr.net/npm/semantic-ui@2.4.2/dist/semantic.min.css'
          />
          <link
            href='https://fonts.googleapis.com/css2?family=Play&display=swap'
            rel='stylesheet'
          />
        </Head>
        </>);
}

SiteHeader.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  keyword: PropTypes.string
};
