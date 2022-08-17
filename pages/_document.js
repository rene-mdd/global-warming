import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html>
      <Head>
        <link rel="shortcut icon" type="image/gif" href="favicon/favicon.ico" />
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
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
