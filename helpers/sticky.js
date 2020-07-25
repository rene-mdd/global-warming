import _ from 'lodash'
import React, { Component, createRef } from 'react'
import {
    Button,
    Container,
    Divider,
    Grid,
    Header,
    Icon,
    Image,
    List,
    Menu,
    Responsive,
    Segment,
    Sidebar,
    Visibility,
} from 'semantic-ui-react'
import Link from 'next/link'



export default class StickyExampleAdjacentContext extends Component {


  render() {
    return (
        <Menu
              fixed='top'
             
              size='huge'
            >
              <Container>
              <Link href="/" passHref><Menu.Item as='a' position='left' active>
                <img src="/logo.png" />
                </Menu.Item></Link>
                <Link href="/" passHref><Menu.Item as='a'>Home</Menu.Item></Link>
                <Link href="/news" passHref><Menu.Item as='a'>News</Menu.Item></Link>
                <Link href="/organizations" passHref><Menu.Item as='a'>Organization</Menu.Item></Link>
                <Menu.Item position='right'>
                 Contact
                </Menu.Item>
              </Container>
            </Menu>
        
          
     
    )
  }
}


      