/* eslint-disable no-nested-ternary */

"use client";

import { useState, useEffect } from "react";
import {
  Container,
  CardMedia,
  Grid,
  Typography,
  Paper,
  Input,
  TextField,
  Button,
  Alert,
  AlertTitle,
  FormLabel,
} from "@mui/material";
import PropTypes from "prop-types";
import StickyMenu from "../../components/semantic/menu";
import SiteHeader from "../../components/siteHeader";
import Footer from "../../components/semantic/footer";
import { useLocale, useT } from "../../lib/i18n";
import { localizedPath } from "../../lib/i18n-config";

// consentmanager vendor ID of Google reCAPTCHA. reCAPTCHA reads device
// information and sends the IP address to Google, so under § 25(1) TDDDG
// its script loads only once this vendor has consent.
const RECAPTCHA_VENDOR = "s1409";

/* eslint-disable no-underscore-dangle -- __cmp is consentmanager's API */
function cmpAvailable() {
  return typeof window !== "undefined" && typeof window.__cmp === "function";
}

function hasRecaptchaConsent() {
  if (!cmpAvailable()) return false;
  const data = window.__cmp("getCMPData");
  return Boolean(data?.vendorConsents?.[RECAPTCHA_VENDOR]);
}
/* eslint-enable no-underscore-dangle */

function Contact({ siteKey = "", secretKey = "" }) {
  const locale = useLocale();
  const t = useT().contact;
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [recaptchaLoaded, setRecaptchaLoaded] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState("idle");
  const [statusMessage, setStatusMessage] = useState("");
  // null until the consent check has run, so the server HTML has no notice.
  const [recaptchaConsent, setRecaptchaConsent] = useState(null);

  // The CMP fires "consent" when a visitor decides and also when a stored
  // decision is found, so a choice made in the banner unlocks the form
  // without a reload.
  useEffect(() => {
    const check = () => setRecaptchaConsent(hasRecaptchaConsent());
    check();
    if (!cmpAvailable()) return undefined;
    /* eslint-disable no-underscore-dangle */
    window.__cmp("addEventListener", ["consent", check, false], null);
    return () =>
      window.__cmp("removeEventListener", ["consent", check, false], null);
    /* eslint-enable no-underscore-dangle */
  }, []);

  // Clicking the button after reading the notice is the consent; it is
  // recorded in the CMP so the visitor can revoke it in the CMP settings.
  // Without the CMP (e.g. blocked by an ad blocker) the click alone counts.
  const allowRecaptcha = () => {
    if (cmpAvailable()) {
      // eslint-disable-next-line no-underscore-dangle
      window.__cmp("setVendorConsent", [RECAPTCHA_VENDOR, 1]);
    }
    setRecaptchaConsent(true);
  };

  // Load reCAPTCHA script
  useEffect(() => {
    if (!recaptchaConsent) return;
    // Avoid duplicate loading
    if (
      typeof window !== "undefined" &&
      !window.grecaptcha &&
      !document.querySelector('script[src*="recaptcha/api.js"]')
    ) {
      const script = document.createElement("script");
      // hl sets the widget's language; English keeps the original URL.
      script.src = `https://www.google.com/recaptcha/api.js${
        locale === "en" ? "" : `?hl=${locale}`
      }`;
      script.async = true;
      script.defer = true;
      script.onload = () => {
        setRecaptchaLoaded(true);
      };
      document.head.appendChild(script);
    } else if (typeof window !== "undefined" && window.grecaptcha) {
      setRecaptchaLoaded(true);
    }
  }, [recaptchaConsent]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Get reCAPTCHA response
    if (!window.grecaptcha) {
      setStatus("error");
      setStatusMessage(t.status.recaptchaMissing);
      return;
    }

    const recaptchaResponse = window.grecaptcha.getResponse();
    if (!recaptchaResponse) {
      setStatus("error");
      setStatusMessage(t.status.recaptchaIncomplete);
      return;
    }

    setIsSubmitting(true);
    setStatus("idle");

    try {
      // This is the URL of our own Static Forms API endpoint
      const response = await fetch("https://api.staticforms.dev/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          apiKey: secretKey,
          name,
          email,
          subject: "StaticForms - Contact Form",
          message,
          "g-recaptcha-response": recaptchaResponse,
          // Set replyTo directly to the email address
          replyTo: "help@global-warming.org",
        }),
      });

      const data = await response.json();
      if (response.ok) {
        setStatus("success");
        setStatusMessage(t.status.success);
        // Reset form fields
        setName("");
        setEmail("");
        setMessage("");
        // Reset reCAPTCHA
        window.grecaptcha.reset();
      } else {
        setStatus("error");
        // data.error comes from Static Forms and is always English.
        setStatusMessage(data.error || t.status.failed);
      }
    } catch (error) {
      setStatus("error");
      setStatusMessage(t.status.unexpected);
      console.error("Form submission error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };
  const contactKeywords =
    "Global warming, climate change, Climate Accountability, contact";
  const websiteUrl = "https://www.global-warming.org/contact";

  return (
    <>
      <SiteHeader
        description={t.meta.description}
        title={t.meta.title}
        keywords={contactKeywords}
        websiteUrl={websiteUrl}
      />
      <StickyMenu />
      <Container>
        <Grid columns={{ lg: 12 }} xl="auto">
          <Typography
            align="center"
            variant="h1"
            component="h2"
            className="contact-title"
          >
            {t.heading}
          </Typography>
          <Grid>
            <Grid justifyContent="center" container>
              <Grid item xs={12} sm={10} md={6}>
                <CardMedia
                  src="/images/contact-image.png"
                  alt={t.imageAlt}
                  component="img"
                  className="contact-earth-logo"
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid>
            <Grid container justifyContent="center">
              <Grid item xs={10} md={6}>
                <Paper className="contact-info">
                  <p className="contact-segment">
                    {t.inquiries}{" "}
                    <a href="mailto:help@global-warming.org">
                      help@global-warming.org
                    </a>
                    .
                  </p>
                </Paper>
                <form onSubmit={handleSubmit} className="contact-form-wrapper">
                  <FormLabel htmlFor="name" required>
                    {t.form.name}
                  </FormLabel>
                  <Input
                    id="name"
                    name="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    autoFocus
                  />
                  <FormLabel htmlFor="email" required>
                    {t.form.email}
                  </FormLabel>
                  <Input
                    id="email"
                    name="email"
                    value={email}
                    required
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <FormLabel htmlFor="subject" className="hide-element">
                    {t.form.subject}
                  </FormLabel>
                  <Input
                    className="hide-element"
                    id="subject"
                    type="hidden"
                    name="subject"
                    onChange={(e) => setName(e.target.value)}
                  />
                  <Input
                    id="honeypot"
                    name="honeypot"
                    className="hide-element"
                    onChange={(e) => setName(e.target.value)}
                  />
                  <FormLabel htmlFor="message">{t.form.message}</FormLabel>
                  <TextField
                    id="message"
                    name="message"
                    variant="standard"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    margin="normal"
                    required
                    multiline
                  />
                  {recaptchaConsent === false && (
                    <div className="recaptcha-consent">
                      <Typography component="p" variant="body2" mb={1}>
                        {t.recaptchaConsent.text}{" "}
                        <a href={localizedPath("/privacy-policy", locale)}>
                          {t.recaptchaConsent.privacyLink}
                        </a>
                        . {t.recaptchaConsent.alternative}{" "}
                        <a href="mailto:help@global-warming.org">
                          help@global-warming.org
                        </a>
                        .
                      </Typography>
                      <Button
                        type="button"
                        variant="outlined"
                        onClick={allowRecaptcha}
                      >
                        {t.recaptchaConsent.allow}
                      </Button>
                    </div>
                  )}
                  <div
                    className="g-recaptcha"
                    id="recaptcha-container"
                    data-sitekey={siteKey}
                    data-action="LOGIN"
                  />{" "}
                  <Button
                    className="submit-button"
                    type="submit"
                    value="Submit"
                    onSubmit={handleSubmit}
                    disabled={isSubmitting || !recaptchaLoaded}
                    required
                  >
                    {t.form.submit}
                  </Button>
                </form>
                <Alert hidden={status === "idle"} severity={status}>
                  {status === "success"
                    ? t.status.sent
                    : status === "error"
                    ? t.status.errorTitle
                    : null}
                  <AlertTitle>
                    {status === "success"
                      ? t.status.thanks
                      : status === "error"
                      ? statusMessage
                      : null}
                  </AlertTitle>
                </Alert>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Container>
      <Footer classNameProp="footer" />
    </>
  );
}

Contact.propTypes = {
  siteKey: PropTypes.string.isRequired,
  secretKey: PropTypes.string.isRequired,
};

export async function getServerSideProps({ res }) {
  const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || "";
  const secretKey = process.env.STATIC_FORMS_TOKEN || "";
  res.setHeader(
    "Cache-Control",
    "maxage=43200, s-maxage=43200, stale-while-revalidate"
  ); // Vercel Cache (Network)
  return {
    props: {
      siteKey,
      secretKey,
    },
  };
}

export default Contact;
