import {
  Button,
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
  Grid
} from 'semantic-ui-react'



export default class SideBar extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      activeItem: "",
      menuVisible: true,
      rotate: false
    };
  }

  componentDidUpdate(prevProps, prevState) {
    console.log(prevState)
    console.log(prevProps)
    console.log(this.props)
    
   
    if(prevProps?.callBacksideTemp?.observer){
      const viewResult = prevProps.callBacksideTemp.observer;
    if (this.props.callBacksideTemp.observer !== this.state.activeItem) {
     
      this.setState({activeItem: viewResult})
    }
    }
  }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name });

  render() {
    console.log(this.state.activeItem)
    return <>

      <Sticky className="chart-img--remove">
        <Rail className="fix" >
          <Grid columns={1} >
            <Grid.Column className="close-button" width="1" >
              <Menu secondary attached="top" className="sidebar-button" >
                <Menu.Item style={{ margin: "42px 0 -20px 0" }} onClick={() => this.setState({ menuVisible: !this.state.menuVisible, rotate: !this.state.rotate })} >
                  <img src="images/icons8-more-than-60.png" id={this.state.rotate ? "rotate-right" : "rotate-left"} />
                </Menu.Item>
              </Menu>
            </Grid.Column>
            <Grid.Column >
              <Sidebar.Pushable as={Segment} className={this.state.rotate ? "sidebar-config-out" : "sidebar-config-in"} >
                <Sidebar as={Menu} position="left" animation="slide along" width='thin' className="sideBar" visible={this.state.menuVisible} vertical inverted>
                  <Menu.Item name='temperature' active={this.state.activeItem === 'temperature'}
                    onClick={this.handleItemClick}>Temperature</Menu.Item>
                  <Menu.Item name='co2' active={this.state.activeItem === 'co2'}
                    onClick={this.handleItemClick}>Carbon Dioxide</Menu.Item>
                  <Menu.Item name='methane' active={this.state.activeItem === 'methane'}
                    onClick={this.handleItemClick}>Methane</Menu.Item>
                  <Menu.Item name='Nitrous Oxide' active={this.state.activeItem === 'nitrous'}
                    onClick={this.handleItemClick}>Nitrous Oxide</Menu.Item>
                  <Menu.Item name='Polar Ice' active={this.state.activeItem === 'arctic'}
                    onClick={this.handleItemClick}>Polar Ice</Menu.Item>
                </Sidebar>

              </Sidebar.Pushable>
            </Grid.Column>
          </Grid>
        </Rail>
      </Sticky>

    </>
  }
}
