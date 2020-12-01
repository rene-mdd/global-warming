import StickyMenu from '../../components/semantic/sticky';
import {
  Button,
  Form,
  Container,
  Grid,
  Image,
  Header,
  Segment,
  Message
} from 'semantic-ui-react';
import SiteHeader from '../../components/siteHeader';
import { useState } from 'react';

const Contact = () => {
  const [contact, setContact] = useState({
    name: '',
    email: '',
    subject: 'StaticForms - Contact Form',
    honeypot: '',
    message: '',
    replyTo: 'info@rene-rodriguez.com',
    accessKey: '21b96b01-5e41-419f-a493-cd3f5327a645'
  });

  const [response, setResponse] = useState({
    type: '',
    message: ''
  });

  const handleChange = e =>
    setContact({ ...contact, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    setContact({
      ...contact,
      name: '',
      email: '',
      message: ''
    });
    try {
      const res = await fetch('https://api.staticforms.xyz/submit', {
        method: 'POST',
        body: JSON.stringify(contact),
        headers: { 'Content-Type': 'application/json' }
      });

      const json = await res.json();

      if (json.success) {
        setResponse({
          type: 'success',
          message: 'Thank you for reaching out to us.'
        });
      } else {
        setResponse({
          type: 'error',
          message: json.message
        });
      }
    } catch (e) {
      console.log('An error occurred', e);
      setResponse({
        type: 'error',
        message: 'An error occurred while submitting the form'
      });
    }
  };
  const contactMetaDescription =
    'For suggestions about this global warming project, or if you want to discuss ideas related to this kind of environmental issues, use this contact section.';
    const contactMetaTitle = "Global warming contact for sharing ideas and solutions.";
    const contactKeywords = "Global warming, climate change, contact";
  return (
    <>
      <SiteHeader description={contactMetaDescription} title={contactMetaTitle} keywords={contactKeywords}/>
      <StickyMenu />
      <Container fluid className='contact-container'>
        <Grid centered columns='equal'>
          <Header as='h1' className='contact-title'>
          Contact
          </Header>
          <Grid.Row>
            <Grid.Column width='5'>
              <Image
                centered
                className='contact-image'
                src='images/contact-image.png'
              />
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column width='10' className="form-width">
              <Segment>
                <p id="contact-segment">
                Hello! My name is René Rodríguez and I am the developer of this
                site. I am currently living in Berlin. For suggestions about this
                project, or if you want to discuss ideas related to this kind of
                environmental issues, please send me a message or write me at{' '}
                <b>hello@rene-rodriguez.com</b>{' '}
                </p>
              </Segment>
              <Form
                action='https://api.staticforms.xyz/submit'
                method='post'
                onSubmit={handleSubmit}
              >
                <Form.Field required>
                  <label>Name</label>
                  <input
                    placeholder='Name'
                    name='name'
                    value={contact.name}
                    onChange={handleChange}
                  />
                </Form.Field>
                <Form.Field required>
                  <label>Email</label>
                  <input
                    placeholder='Your email address'
                    name='email'
                    value={contact.email}
                    onChange={handleChange}
                  />
                </Form.Field>
                <Form.Field style={{ display: 'none' }}>
                  <label>Subject</label>
                  <input
                    type='hidden'
                    name='subject'
                    onChange={handleChange}
                  ></input>
                  <input
                    name='honeypot'
                    style={{ display: 'none' }}
                    onChange={handleChange}
                  />
                </Form.Field>

                <Form.TextArea
                  name='message'
                  label='Message'
                  placeholder='Your message'
                  value={contact.message}
                  onChange={handleChange}
                  required
                />
                <Button
                  className='submit-button'
                  type='submit'
                  value='Submit'
                  onChange={handleChange}
                  required
                >
                  Submit
                </Button>
              </Form>
              <Message
                hidden={response.type !== 'success'}
                warning={response.type === 'error'}
                success={response.type === 'success'}
                header={
                  response.type === 'success'
                    ? 'Your email was sent.'
                    : response.type === 'error'
                    ? 'Sorry there was an error'
                    : null
                }
                content={
                  response.type === 'success'
                    ? 'Thank you!'
                    : response.type === 'error'
                    ? 'Try again or send an email'
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
