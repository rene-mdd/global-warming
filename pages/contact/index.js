/* eslint-disable no-nested-ternary */

"use client";

import { useState, useEffect } from "react";
// import ReCAPTCHA from "react-google-recaptcha";
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

function Contact(props) {
  const { siteKey, secretKey } = props;
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [recaptchaLoaded, setRecaptchaLoaded] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState("idle");
  const [statusMessage, setStatusMessage] = useState("");

  // Load reCAPTCHA script
  useEffect(() => {
    // Avoid duplicate loading
    if (
      typeof window !== "undefined" &&
      !window.grecaptcha &&
      !document.querySelector('script[src*="recaptcha/api.js"]')
    ) {
      const script = document.createElement("script");
      script.src = `https://www.google.com/recaptcha/api.js`;
      script.async = true;
      script.defer = true;
      script.onload = () => {
        setRecaptchaLoaded(true);
      };
      document.head.appendChild(script);
    } else if (typeof window !== "undefined" && window.grecaptcha) {
      setRecaptchaLoaded(true);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
console.log(window.grecaptcha)
console.log(window.grecaptcha.getResponse())
    // Get reCAPTCHA response
    if (!window.grecaptcha) {
      setStatus("error");
      setStatusMessage(
        "reCAPTCHA not loaded. Please refresh the page and try again."
      );
      return;
    }

    const recaptchaResponse = window.grecaptcha.getResponse();
    if (!recaptchaResponse) {
      setStatus("error");
      setStatusMessage("Please complete the reCAPTCHA verification.");
      return;
    }

    setIsSubmitting(true);
    setStatus("idle");

    try {
      // This is the URL of our own Static Forms API endpoint
      const response = await fetch("https://api.staticforms.xyz/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          apiKey: secretKey || "",
          name,
          email,
          subject,
          message,
          recaptchaToken: recaptchaResponse,
          // Set replyTo directly to the email address
          replyTo: email,
        }),
      });

      const data = await response.json();
      console.log(data)
      console.log(response)
      if (response.ok) {
        setStatus("success");
        setStatusMessage(
          "Thank you for your message! We will get back to you soon."
        );
        // Reset form fields
        setName("");
        setEmail("");
        setSubject("");
        setMessage("");
        // Reset reCAPTCHA
        window.grecaptcha.reset();
      } else {
        setStatus("error");
        setStatusMessage(
          data.error || "Failed to send your message. Please try again later."
        );
      }
    } catch (error) {
      setStatus("error");
      setStatusMessage("An unexpected error occurred. Please try again later.");
      console.error("Form submission error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };
  const contactMetaDescription =
    "For suggestions about this global warming project, or if you want to discuss ideas related to this kind of environmental issues, use this contact section.";
  const contactMetaTitle = "Climate Accountability API contact";
  const contactKeywords =
    "Global warming, climate change, Climate Accountability, contact";
  const websiteUrl = "https://global-warming.org/contact";

  return (
    <>
      <SiteHeader
        description={contactMetaDescription}
        title={contactMetaTitle}
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
            Contact
          </Typography>
          <Grid>
            <Grid justifyContent="center" container>
              <Grid item xs={12} sm={10} md={6}>
                <CardMedia
                  src="images/contact-image.png"
                  alt="earth image"
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
                    For questions about this project or to discuss ideas related
                    to it, please send us a message or write to us at{" "}
                    <a href="mailto:info@global-warming.org">
                      info@global-warming.org
                    </a>
                    .
                  </p>
                </Paper>
                <form onSubmit={handleSubmit} className="contact-form-wrapper">
                  <FormLabel htmlFor="name" required>
                    Name
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
                    Email
                  </FormLabel>
                  <Input
                    id="email"
                    name="email"
                    value={email}
                    required
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <FormLabel htmlFor="subject" className="hide-element">
                    Subject
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
                  <FormLabel htmlFor="message">Your message</FormLabel>
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
                  <div className="g-recaptcha" data-sitekey={siteKey} />{" "}
                  <Button
                    className="submit-button"
                    type="submit"
                    value="Submit"
                    onSubmit={handleSubmit}
                    disabled={isSubmitting || !recaptchaLoaded}
                    required
                  >
                    Submit
                  </Button>
                </form>
                <Alert hidden={status === "idle"} severity={status}>
                  {status === "success"
                    ? "Your email was sent."
                    : status === "error"
                    ? "Sorry there was an error"
                    : null}
                  <AlertTitle>
                    {status === "success"
                      ? "Thank you!"
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
  siteKey: PropTypes.string,
  secretKey: PropTypes.string,
};

Contact.defaultProps = {
  siteKey: "",
  secretKey: "",
};

export async function getServerSideProps({ res }) {
  const siteKey = process.env.RECAPTCHA_API_KEY || "";
  const secretKey = process.env.RECAPTCHA_SECRET_KEY;
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
