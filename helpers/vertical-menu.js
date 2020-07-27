import React, { Component } from 'react'
import { Button,
  Container,
  Divider,
  Dropdown,
  Header,
  Message,
  Segment,
  Menu,
  Icon,
  Sidebar } from 'semantic-ui-react'

export default class SideMenu extends Component {
  state = { activeItem: 'home' }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  render() {
    const { activeItem } = this.state

    return (
      <Sidebar.Pushable as={Segment} attached="bottom" >
        <Sidebar as={Menu} fixed="left" className="sideBar" animation="uncover" visible={true} icon="labeled" vertical inline inverted>
      <Menu pointing secondary vertical  className="sideMenu">
        <Menu.Item
          name='Temperature'
          active={activeItem === 'Temperature'}
          onClick={this.handleItemClick}
        />
        <Menu.Item
          name='Carbon Dioxide'
          active={activeItem === 'Carbon Dioxide'}
          onClick={this.handleItemClick}
        />
        <Menu.Item
          name='Methane'
          active={activeItem === 'Methane'}
          onClick={this.handleItemClick}
        />
          <Menu.Item
          name='Nitrous Oxide'
          active={activeItem === 'Nitrous Oxide'}
          onClick={this.handleItemClick}
        />
           <Menu.Item
          name='Polar Ice'
          active={activeItem === 'polar Ice'}
          onClick={this.handleItemClick}
        />
      </Menu>
      </Sidebar>
         </Sidebar.Pushable>
    )
  }
}
