
import Head from "next/head"
export default function SiteHeader() {
   
        return (<>
     <Head>
     <script
    async
    src="https://www.googletagmanager.com/gtag/js?id=['UA-174660681-1']"
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
          <title>Global Warming</title>
          <meta
            property='og:url'
            content={
              'https://global-warming-azure.vercel.app/api/chart-img/tempChart.jpeg'
            }
          />
          <meta property='og:title' content={'global Warming data'} />
          <meta property='og:image' content={`api/chart-img/tempChart.jpeg`} />
          <meta property='og:image:width' content='400' />
          <meta property='og:image:height' content='300' />
          <meta property='og:image:type' content='image/jpeg' />
          <meta
            name='description'
            content='Global Warming and Climate Change live API, data, graphs, and news.'
          />
          <link rel='icon' href='/favicon.ico' />
          <link
            rel='stylesheet'
            type='text/css'
            href='path/to/chartjs/dist/Chart.min.css'
          />
          <link
            rel='stylesheet'
            href='//cdn.jsdelivr.net/npm/semantic-ui@2.4.2/dist/semantic.min.css'
          />
          <link
            href='https://fonts.googleapis.com/css2?family=Play&display=swap'
            rel='stylesheet'
          />
        </Head>
        </>)
    
}
;