// import Script from "next/script";
import { Container, Typography, Link } from "@mui/material";
import PropTypes from "prop-types";

export default function Footer({ classNameProp }) {
  return (
    <>
      <Container maxWidth="false" component="footer" className={classNameProp}>
        <Container align="center">
          <Typography component="p" className="imprint">
            <Link color="primary" href="/imprint">
              Imprint
            </Link>
          </Typography>
        </Container>
        <Container align="center">
          <Typography component="p">
            {`Copyright © 2020 - ${new Date().getFullYear()}
              Climate Accountability API. All Rights Reserved`}
          </Typography>
        </Container>
        <Container align="center">
          <Typography component="p" className="imprint">
            <Link color="primary" href="/privacy-policy">
              Privacy Policy
            </Link>
          </Typography>
        </Container>
      </Container>
    </>
  );
}

Footer.propTypes = {
  classNameProp: PropTypes.string,
};

Footer.defaultProps = {
  classNameProp: "footer",
};
