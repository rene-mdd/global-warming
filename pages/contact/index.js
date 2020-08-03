import StickyMenu from '../../components/semantic/sticky'
import {
  Button,
  Form,
  Container,
  Grid,
  Image,
  Header,
  Segment
} from 'semantic-ui-react'
import SiteHeader from "../../components/siteHeader"

class Contact extends React.Component {
  render () {
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
              <Grid.Column width='6'>
                <Segment>
                  Hello! My name is René Rodríguez, I'm the developer of this
                  site. I'm currently living in Berlin. If you want to contact
                  me for suggestions about this site, or project ideas related
                  to this kind of environmental issues. Please send me a message
                  or write me at <b>info@rene-rodriguez.com</b>{' '}
                </Segment>
                <Form action="https://api.staticforms.xyz/submit" method="post">
                  <Form.Field>
                    <label>Name</label>
                    <input placeholder='Name' />
                    <input type="hidden" name="accessKey" value="21b96b01-5e41-419f-a493-cd3f5327a645"/>
                  </Form.Field>
                  <Form.Field>
                  <label>Email</label>
                    <input placeholder='Your email address' />
                    <input type="hidden" name="replyTo" value="info@rene-rodriguez.com" />
                    <input type="text" name="honeypot" style={{display: "none"}}/>
                    <input type="hidden" name="redirectTo" value="api/success"></input>
                  </Form.Field>
                  <Form.TextArea
                    label='Message'
                    placeholder='What are you thinking about?'/>
                  <Button type='submit' value="Submit">Submit</Button>
                </Form>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Container>
      </>
    )
  }
}

export default Contact
