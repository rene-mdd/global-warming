// import Script from "next/script";
import { Container, Typography, Link } from "@mui/material";
import PropTypes from "prop-types";
import { useLocale, useT } from "../../lib/i18n";
import { localizedPath } from "../../lib/i18n-config";

export default function Footer({ classNameProp }) {
  const t = useT().footer;
  const locale = useLocale();
  return (
    <>
      <Container maxWidth="false" component="footer" className={classNameProp}>
        <Container align="center">
          <Typography component="p" className="imprint">
            <Link color="primary" href={localizedPath("/imprint", locale)}>
              {t.imprint}
            </Link>
          </Typography>
        </Container>
        <Container align="center">
          <Typography component="p">
            {`Copyright © 2020 - ${new Date().getFullYear()}
              ${t.rights}`}
          </Typography>
        </Container>
        <Container align="center">
          <Typography component="p" className="imprint">
            <Link color="primary" href={localizedPath("/privacy-policy", locale)}>
              {t.privacy}
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
