import _ from 'lodash'
import React, { Component } from 'react'
import { Container, Image, Menu } from 'semantic-ui-react'
import Link from 'next/link'

export default class StickySideBar extends Component {
  render () {
    return (
      <Menu as='header'
        fixed='top'
        size='huge'
        stackable={true}
        className='chart-img--remove'
      >
        <Container as='nav'>
          <Link href='/' passHref>
            <Menu.Item as='a' position='left'>
              <Image size='mini' src='images/contact-image.png' />
            </Menu.Item>
          </Link>
          <Link href='/' passHref>
            <Menu.Item as='a'>Home</Menu.Item>
          </Link>
          <Link href='/news' passHref>
            <Menu.Item as='a'>News</Menu.Item>
          </Link>
          <Link href='/deforestation' passHref>
            <Menu.Item as='a'>Deforestation</Menu.Item>
          </Link>
          <Link href='/contact' passHref>
            <Menu.Item position='right'>Contact</Menu.Item>
          </Link>
        </Container>
      </Menu>
    )
  }
}
