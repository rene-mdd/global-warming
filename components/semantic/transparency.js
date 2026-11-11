import { Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
import { Container } from "@mui/system";
import Link from "next/link";
import { useRouter } from "next/router";
import { useT } from "../../lib/i18n";
import { DEFAULT_LOCALE, linkLocale } from "../../lib/i18n-config";

export default function Transparency() {
  const t = useT().about.transparency;
  const { locale = DEFAULT_LOCALE } = useRouter();
  return (
    <>
      <Grid size={{ xs: 12, md: 6 }} className="transparency-text-wrapper">
        <Typography variant="h2" className="transparency-title" align="center">
          {t.title}
        </Typography>
        <Container>
          <Typography component="p" fontSize="20px" mb={5} textAlign="center">
            {t.text}
          </Typography>
        </Container>
        <Container align="center">
          <Typography component="h3">{t.financialStatements}</Typography>
          <Typography
            component="a"
            href="/documents/climate-accountability-api-jahresabschluss.pdf"
            download
          >
            {t.download}
          </Typography>
          <Typography component="h3" mt={1}>
            {t.articlesOfAssociation}
          </Typography>
          <Typography
            component="a"
            href="/documents/articles-of-association.pdf"
            download
          >
            {t.download}
          </Typography>
        </Container>
        <Container align="center" sx={{ marginTop: "40px" }}>
          {/* next/link keeps the current locale by default; this falls back
              to English while /contact has no German version. */}
          <Link
            href="/contact"
            locale={linkLocale("/contact", locale)}
            className="link-to-contact"
          >
            {t.contact}
          </Link>
        </Container>
      </Grid>
    </>
  );
}
