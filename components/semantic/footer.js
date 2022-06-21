/* eslint-disable */
import Script from "next/script";

export default function Footer() {
  return (
    <>
      <footer>
        <Script
          defer
          src="https://www.googletagmanager.com/gtag/js?id=[Tracking ID]"
        ></Script>
        <Script
          dangerouslySetInnerHTML={{
            __html: `
                      window.dataLayer = window.dataLayer || [];
                      function gtag(){dataLayer.push(arguments);}
                      gtag('js', new Date());
                      gtag('config', 'UA-174660681-1');
                  `,
          }}
        ></Script>
      </footer>
    </>
  );
}
