import StickyMenu from '../../components/semantic/sticky'
import {
  Button,
  Form,
  Container,
  Grid,
  Image,
  Header,
  Segment,
  Message
} from 'semantic-ui-react'
import SiteHeader from '../../components/siteHeader'
import { useState } from 'react'

const Contact = () => {
  const [contact, setContact] = useState({
    name: '',
    email: '',
    subject: 'StaticForms - Contact Form',
    honeypot: '', 
    message: '',
    replyTo: 'info@rene-rodriguez.com', 
    accessKey: '21b96b01-5e41-419f-a493-cd3f5327a645'
  })

  const [response, setResponse] = useState({
    type: '',
    message: ''
  })

  const handleChange = e =>
    setContact({ ...contact, [e.target.name]: e.target.value })

  const handleSubmit = async e => {
    e.preventDefault()
    try {
      const res = await fetch('https://api.staticforms.xyz/submit', {
        method: 'POST',
        body: JSON.stringify(contact),
        headers: { 'Content-Type': 'application/json' }
      })
      

      const json = await res.json() 
      
      if (json.success) {

        setResponse({
          type: 'success',
          message: 'Thank you for reaching out to us.'
        })
      } else {
        setResponse({
          type: 'error',
          message: json.message
        })
      }
    } catch (e) {
      console.log('An error occurred', e)
      setResponse({
        type: 'error',
        message: 'An error occurred while submitting the form'
      })
    }

  }

  return (
    <>
      <SiteHeader />
      <StickyMenu />
      <Container fluid className='contact-container'>
        <Grid centered columns='equal'>
          <Header as='h2' className='contact-title'>
            <span>Contact</span>
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
            <Grid.Column width='10'>
              <Segment>
                Hello! My name is René Rodríguez, I'm the developer of this
                site. I'm currently living in Berlin. If you want to contact me
                for suggestions about this site, or project ideas related to
                this kind of environmental issues. Please send me a message or
                write me at <b>info@rene-rodriguez.com</b>{' '}
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
                    type='text'
                    name='name'
                    onChange={handleChange}
                  />

                </Form.Field>
                <Form.Field required>
                  <label>Email</label>
                  <input
                    placeholder='Your email address'
                    type='email'
                    name='mail'
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
                    type='text'
                    name='honeypot'
                    style={{ display: 'none' }}
                    onChange={handleChange}
                  />
                </Form.Field>

                <Form.TextArea
                  name='message'
                  label='Message'
                  placeholder='What are you thinking about?'
                  onChange={handleChange}
                  required
                />
                <Button
                className="submit-button"
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
               warning={response.type === "error"}
                success={response.type === 'success'}
                header={response.type === 'success' ? "Your email was sent." : response.type === 'error' ? "Sorry there was an error" : null}
                content={response.type === 'success' ? "Thank you!" : response.type === 'error' ? "Try again or send an email" : null}
              />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
    </>
  )
}

export default Contact