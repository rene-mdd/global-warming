/* eslint-disable no-nested-ternary */
import { useState } from "react";
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
import StickyMenu from "../../components/semantic/menu";
import SiteHeader from "../../components/siteHeader";
import Footer from "../../components/semantic/footer";

const Contact = () => {

  const [contact, setContact] = useState({
    name: "",
    email: "",
    subject: "StaticForms - Contact Form",
    honeypot: "",
    message: "",
    replyTo: "help@global-warming",
    accessKey: "4b81c8f7-3ee9-4f84-9e25-d45657620223",
  });

  const [response, setResponse] = useState({
    type: "",
    message: "",
  });
  const recaptchaApiKey = process.env.RECAPTCHA_API_KEY;

  const handleChange = (e) =>
    setContact({ ...contact, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setContact({
      ...contact,
      name: "",
      email: "",
      message: "",
    });
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
          "An error occurred while submitting the form. please write a direct email to rene.r@live.com",
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
                <form
                  action="https://api.staticforms.xyz/submit"
                  method="post"
                  onSubmit={handleSubmit}
                  className="contact-form-wrapper"
                >
                  <input type="hidden" name="apiKey" value={recaptchaApiKey} />
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
                  {/* reCAPTCHA widge */}
                  <div
                    className="g-recaptcha"
                    data-sitekey="6Ld7WAErAAAAAIZ_XI9p5rTEVObKDwu1vrFat2vD"
                  />
                  <Button
                    className="submit-button"
                    type="submit"
                    value="Submit"
                    onChange={handleChange}
                    required
                  >
                    Submit
                  </Button>
                  {/* Include reCAPTCHA JavaScript */}
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
                      ? "Try again or write to help@global-warming.org"
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

export default Contact;
