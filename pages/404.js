import Head from "next/head";
import Link from "next/link";
import { Typography } from "@mui/material";
import { Container } from "@mui/system";
import StickyMenu from "../components/semantic/menu";
import Footer from "../components/semantic/footer";
import { useT } from "../lib/i18n";

// No SiteHeader: an error page has no canonical URL or hreflang
// alternates, and it must not be indexed.
function NotFound() {
  const t = useT().notFound;

  return (
    <>
      <Head>
        <title>{t.title}</title>
        <meta name="robots" content="noindex" />
      </Head>
      <StickyMenu />
      <Container sx={{ minHeight: "60vh", textAlign: "center", pt: 12 }}>
        <Typography component="h1" variant="h4" mb={3}>
          {t.heading}
        </Typography>
        <Typography component="p" mb={4}>
          {t.text}
        </Typography>
        <Link href="/">{t.home}</Link>
      </Container>
      <Footer classNameProp="footer" />
    </>
  );
}

export default NotFound;
