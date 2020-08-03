import StickyMenu from '../../components/semantic/sticky'
import {Message, Container} from 'semantic-ui-react'
export default function Success() {
    return(<>
    <StickyMenu />
    <Container className="contact-container">
    <Message
    success
    header='Your email was sent.'
    content='Thank you!'
  />
</Container>
    </>)
}