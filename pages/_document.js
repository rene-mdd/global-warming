import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html>
      <script
        type="text/javascript"
        data-cmp-ab="1"
        src="https://cdn.consentmanager.net/delivery/js/semiautomatic.min.js"
        data-cmp-cdid="83e6be9c61a9a"
        data-cmp-host="c.delivery.consentmanager.net"
        data-cmp-cdn="cdn.consentmanager.net"
        data-cmp-codesrc="0"
      />
      <Head>
        <link rel="shortcut icon" type="image/gif" href="favicon/favicon.ico" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
