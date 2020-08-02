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

class Contact extends React.Component {
  render () {
    return (
      <>
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
                  or write me at info@rene-rodriguez.com{' '}
                </Segment>

                <Form>
                  <Form.Field>
                    <label>Name</label>
                    <input placeholder='Name' />
                  </Form.Field>
                  <Form.TextArea
                    label='Message'
                    placeholder='What are you thinking?'
                  />
                  <Button type='submit'>Submit</Button>
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
