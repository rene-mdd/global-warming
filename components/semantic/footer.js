/* eslint-disable react/prop-types */
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
        <script
          async
          type="text/plain"
          className="cmplazyload"
          data-cmp-vendor="s26"
          data-cmp-src="https://www.googletagmanager.com/gtag/js?id=G-SQLY9RLSQH"
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-SQLY9RLSQH');
                  `,
          }}
        />
      </Container>
    </>
  );
}
