/* eslint-disable */
import Script from "next/script";
import {
  Container,
  Typography,
  Link,
  Divider
} from "@mui/material";

export default function Footer({ props }) {
  return (
    <>
      <Divider />
      <Container maxWidth="false" component="footer" className={props}>
        <Container align="center">
          <Typography component="p">
            {`Copyright ©${new Date().getFullYear()}
              Climate Accountability API. All Rights Reserved`}
          </Typography>
        </Container>
        <Container align="center">
          <Typography component="p" className="imprint"><Link color="primary" href="/imprint">Imprint</Link></Typography>
        </Container>
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
      </Container>
    </>
  );
}
