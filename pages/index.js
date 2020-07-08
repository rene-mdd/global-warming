import Head from 'next/head'
import Link from 'next/link'
import Temperature from '../components/temperature'
import Co2 from '../components/co2'
import Arctic from "../components/arctic"
import Deforestation from "../components/deforestation"
import Countries from '../components/countries'


export default function Home() {
  return (
    <div className="container">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
        <link rel="stylesheet" type="text/css" href="path/to/chartjs/dist/Chart.min.css" />
      </Head>
      <header>
        <ul>
          <Link href="/"><a><li>Home</li></a></Link>
          <Link href="/news"><a><li>News</li></a></Link>
          <Link href="blog"><a><li>Blog</li></a></Link>
          <Link href="organizations"><a><li>Organizations</li></a></Link>
        </ul>
      </header>

      <main>
        <h1 className="title">
          Global warming and environmental degradation
        </h1>
        <section className="home">
          <div>
            <h2>Live global temperature rise</h2>
            <Temperature/>
            <p>Description</p>
          </div>
          <div>
            <h2>Tons of CO2 emission</h2>
            {/* <Co2 /> */}
            <p>Description</p>
          </div>
          <div>
            <h2>Air quality</h2>
            <p>Description</p>
          </div>
          <div>
            <h2>Deforestation</h2>
            {/* <Deforestation/> */}
            <p>Description</p>
          </div>
          <div>
            <h2>Melted polar ice</h2>
            {/* <Arctic /> */}
            <p>Description</p>
          </div>
          <div>
            <h2>
              Emissions by country
            </h2>
            {/* <Countries /> */}
            <p>
              Description
            </p>
          </div>
        </section>


      </main>

      <footer>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <img src="/vercel.svg" alt="Vercel Logo" className="logo" />
        </a>
      </footer>

      <style jsx>{`
      .embed-container {position: relative; padding-bottom: 80%; height: 0; max-width: 100%;} 
      .embed-container iframe, .embed-container object, .embed-container iframe{position: absolute; top: 0; left: 0; width: 100%; height: 100%;} small{position: absolute; z-index: 40; bottom: 0; margin-bottom: -15px;}

      ul {
        display: flex;
      }

      li {
        margin: 0 15px 0 15px;
      }

        .container {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }

        .home {
          display: flex;
          justify-content: space-between;
          flex-direction: column;
        }

    

        main {
          padding: 5rem 0;
          flex: 1;
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          align-items: center;
          flex-direction: column;
        }

        footer {
          width: 100%;
          height: 100px;
          border-top: 1px solid #eaeaea;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        footer img {
          margin-left: 0.5rem;
        }

        footer a {
          display: flex;
          justify-content: center;
          align-items: center;
        }

        a {
          color: inherit;
          text-decoration: none;
        }

        .logo {
          height: 1em;
        }

      
      `}</style>

      <style jsx global>{`
        html,
        body {
          padding: 0;
          margin: 0;
          font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
            Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
            sans-serif;
        }

        * {
          box-sizing: border-box;
        }
      `}</style>
    </div>
  )
}
