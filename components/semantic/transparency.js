import { Typography } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import { Container } from "@mui/system";
import Link from "next/link";

export default function Transparency() {
  return (
    <>
      <Grid size={{ xs: 12, md: 6 }} className="transparency-text-wrapper">
        <Container>
          <Typography component="p" fontSize="20px" mb={5} textAlign="center">
            This project began as a side project on June 18th, 2020. After
            gaining significant global traction and extensive usage, it was
            officially registered as a legal entity in Berlin, Germany, on June
            28th, 2023. On this page, you can view and request various documents
            related to our legal structure, financial information, governance
            policies, and other relevant details. If you require additional
            information or have specific inquiries, please feel free to reach
            out to us.
          </Typography>
        </Container>
        <Link href="/contact" className="link-to-contact">
          Contact
        </Link>
      </Grid>
      <Grid size={{ xs: 12, md: 6 }} className="transparency-text-wrapper">
        <Typography component="h3">Anual financial statements:</Typography>
        <Typography
          component="a"
          href="/documents/climate-accountability-api-jahresabschluss.pdf"
          download
        >
          Download
        </Typography>
        <Typography component="h3">Articles of association:</Typography>
        <Typography
          component="a"
          href="/documents/articles-of-association.pdf"
          download
        >
          Download
        </Typography>
        <Typography component="h3">Transparency register:</Typography>
        <Typography
          component="a"
          href="/documents/transparency-register.pdf"
          download
        >
          Download
        </Typography>
      </Grid>
    </>
  );
}
