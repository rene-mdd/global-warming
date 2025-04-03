/* eslint-disable react/jsx-no-bind */
/* eslint-disable no-nested-ternary */
import { useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
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

const Contact = (props) => {
  const { siteKey, secretKey } = props;
  const [contact, setContact] = useState({
    name: "",
    email: "",
    subject: "StaticForms - Contact Form",
    honeypot: "",
    message: "",
    replyTo: "help@global-warming",
    accessKey: "4b81c8f7-3ee9-4f84-9e25-d45657620223",
    "g-recaptcha-response": "",
  });

  const [response, setResponse] = useState({
    type: "",
    message: "",
  });

  function onChange(value) {
    // token value
    if (value) {
      setContact({
        ...contact,
        "g-recaptcha-response": value,
        secret: secretKey,
      });
    }
  }

  const handleChange = (e) => {
    setContact({ ...contact, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!contact["g-recaptcha-response"]) {
      setResponse({
        type: "error",
        message: "Please complete the reCAPTCHA challenge.",
      });
      return;
    }

    try {
      const res = await fetch("https://api.staticforms.xyz/submit", {
        method: "POST",
        body: JSON.stringify(contact),
        headers: { "Content-Type": "application/json" },
      });

      const json = await res.json();
      if (json.message) {
        setResponse({
          type: "success",
          message: "Thank you for reaching out.",
        });
      } else {
        setResponse({
          type: "error",
          message: json.message,
        });
      }
    } catch (event) {
      setResponse({
        type: "error",
        message:
          "An error occurred while submitting the form. please write a direct email to help@global-warming.org",
      });
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
                    value={contact.name}
                    onChange={handleChange}
                    required
                    autoFocus
                  />
                  <FormLabel htmlFor="email" required>
                    Email
                  </FormLabel>
                  <Input
                    id="email"
                    name="email"
                    value={contact.email}
                    required
                    onChange={handleChange}
                  />
                  <FormLabel htmlFor="subject" className="hide-element">
                    Subject
                  </FormLabel>
                  <Input
                    className="hide-element"
                    id="subject"
                    type="hidden"
                    name="subject"
                    onChange={handleChange}
                  />
                  <Input
                    id="honeypot"
                    name="honeypot"
                    className="hide-element"
                    onChange={handleChange}
                  />
                  <FormLabel htmlFor="message">Your message</FormLabel>
                  <TextField
                    id="message"
                    name="message"
                    variant="standard"
                    value={contact.message}
                    onChange={handleChange}
                    margin="normal"
                    required
                    multiline
                  />
                  <ReCAPTCHA sitekey={siteKey} onChange={onChange} />
                  <Button
                    className="submit-button"
                    type="submit"
                    value="Submit"
                    onSubmit={handleSubmit}
                    required
                  >
                    Submit
                  </Button>
                </form>
                <Alert hidden={response.type === ""} severity={response.type}>
                  {response.type === "success"
                    ? "Your email was sent."
                    : response.type === "error"
                    ? "Sorry there was an error"
                    : null}
                  <AlertTitle>
                    {response.type === "success"
                      ? "Thank you!"
                      : response.type === "error"
                      ? response.message
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
};

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
