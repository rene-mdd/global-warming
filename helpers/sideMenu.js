import {   Button,
    Container,
    Divider,
    Dropdown,
    Header,
    Message,
    Segment,
    Menu,
    Icon,
    Sidebar,
    Sticky,
    Rail,
     Grid } from 'semantic-ui-react'
    

  
  export default class SideBar extends React.Component {
    
    constructor(props) {
      super(props);
      this.state = {activeItem: "Temperature",
    menuVisible: true,
    rotate: false
};
    }

    handleItemClick = (e, { name }) => this.setState({activeItem: name })
    render() {
      return <>
      
         <Sticky>
         <Rail  className="fix" >
          <Grid columns={1} >
          <Grid.Column className="close-button" width="1" >
        <Menu secondary attached="top" className="sidebar-button" >
          <Menu.Item style={{margin: "62px 0 15px 0"}} onClick={() => this.setState({ menuVisible: !this.state.menuVisible, rotate: !this.state.rotate })} >
          <img src="images/icons8-more-than-60.png" id={this.state.rotate ? "rotate-right" : "rotate-left"}/>
          </Menu.Item>          
        </Menu>
        </Grid.Column>
        <Grid.Column >
      <Sidebar.Pushable as={Segment} className={this.state.rotate ? "sidebar-config-out" : "sidebar-config-in"} >
        <Sidebar as={Menu} animation="slide along" width='thin' className="sideBar"  visible={this.state.menuVisible} vertical inverted>
          <Menu.Item name='Temperature'  active={this.state.activeItem === 'Temperature'}
          onClick={this.handleItemClick}>Temperature</Menu.Item>
          <Menu.Item name='Carbon Dioxide' active={this.state.activeItem === 'Carbon Dioxide'}
          onClick={this.handleItemClick}>Carbon Dioxide</Menu.Item>
          <Menu.Item name='Methane' active={this.state.activeItem === 'Methane'}
          onClick={this.handleItemClick}>Methane</Menu.Item>
          <Menu.Item name='Nitrous Oxide'  active={this.state.activeItem === 'Nitrous Oxide'}
          onClick={this.handleItemClick}>Nitrous Oxide</Menu.Item>
           <Menu.Item
          name='Polar Ice'
          active={this.state.activeItem === 'polar Ice'}
          onClick={this.handleItemClick}
        />    
        </Sidebar>
         {/* <Sidebar.Pusher>
              <Segment basic>
                <Header as="h3">Application Content</Header>
                  <p></p>
                  <p></p>
                  <p></p>
                  <p></p>
                  <p></p>
              </Segment>
         </Sidebar.Pusher> */}
      </Sidebar.Pushable>
      </Grid.Column>
    </Grid>
    </Rail>
    </Sticky>
 
      </>
    }
  }
  