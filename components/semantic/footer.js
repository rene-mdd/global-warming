/* eslint-disable */
// import Script from "next/script";
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
          <Typography component="p" className="imprint"><Link color="primary" href="/imprint">Imprint</Link></Typography>
        </Container>
        <Container align="center">
          <Typography component="p">
            {`Copyright ©${new Date().getFullYear()}
              Climate Accountability API. All Rights Reserved`}
          </Typography>
        </Container>
        <Container align="center">
          <Typography component="p" className="imprint"><Link color="primary" href="/privacy-policy">Privacy Policy</Link></Typography>
        </Container>
      </Container>
    </>
  );
}
