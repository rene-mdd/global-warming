/* eslint-disable */ 
import { useState } from "react";
import {
  Button,
  Form,
  Container,
  Grid,
  Image,
  Header,
  Segment,
  Message,
} from "semantic-ui-react";
import StickyMenu from "../../components/semantic/sticky";
import SiteHeader from "../../components/siteHeader";

const Contact = () => {
  const [contact, setContact] = useState({
    name: "",
    email: "",
    subject: "StaticForms - Contact Form",
    honeypot: "",
    message: "",
    replyTo: "rene.r@live.com",
    accessKey: "21b96b01-5e41-419f-a493-cd3f5327a645",
  });

  const [response, setResponse] = useState({
    type: "",
    message: "",
  });

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

      if (json.success) {
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
  const contactMetaTitle =
    "Global warming contact for sharing ideas and solutions.";
  const contactKeywords = "Global warming, climate change, contact";
  return (
    <>
      <SiteHeader
        description={contactMetaDescription}
        title={contactMetaTitle}
        keywords={contactKeywords}
      />
      <StickyMenu />
      <Container fluid className="contact-container">
        <Grid centered columns="equal">
          <Header as="h1" className="contact-title">
            Contact
          </Header>
          <Grid.Row>
            <Grid.Column width="5">
              <Image
                centered
                className="contact-image"
                src="images/contact-image.png"
              />
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column width="10" className="form-width">
              <Segment>
                <p id="contact-segment">
                  Hello! My name is René and I am the creator of this site. I am
                  currently living in Berlin. For suggestions about this
                  project, or if you want to discuss ideas related to this kind
                  of environmental issues, please send me a message or write me
                  at
                  <b> rene.r@live.com</b>
                </p>
              </Segment>
              <Form
                action="https://api.staticforms.xyz/submit"
                method="post"
                onSubmit={handleSubmit}
              >
                <Form.Field required>
                  <label htmlFor="name">
                    Name
                    <input
                      id="name"
                      placeholder="Name"
                      name="name"
                      value={contact.name}
                      onChange={handleChange}
                    />
                  </label>
                </Form.Field>
                <Form.Field required>
                  <label htmlFor="email">
                    Email
                    <input
                      id="email"
                      placeholder="Your email address"
                      name="email"
                      value={contact.email}
                      onChange={handleChange}
                    />
                  </label>
                </Form.Field>
                <Form.Field style={{ display: "none" }}>
                  <label htmlFor="subject">
                    Subject
                    <input
                      id="subject"
                      type="hidden"
                      name="subject"
                      onChange={handleChange}
                    />
                  </label>
                  <input
                    name="honeypot"
                    style={{ display: "none" }}
                    onChange={handleChange}
                  />
                </Form.Field>

                <Form.TextArea
                  name="message"
                  label="Message"
                  placeholder="Your message"
                  value={contact.message}
                  onChange={handleChange}
                  required
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
              </Form>
              <Message
                hidden={response.type !== "success"}
                warning={response.type === "error"}
                success={response.type === "success"}
                header={
                  // ternary operators used to save space
                  response.type === "success"
                    ? "Your email was sent."
                    : response.type === "error"
                    ? "Sorry there was an error"
                    : null
                }
                content={
                  response.type === "success"
                    ? "Thank you!"
                    : response.type === "error"
                    ? "Try again or send an email"
                    : null
                }
              />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
    </>
  );
};

export default Contact;
