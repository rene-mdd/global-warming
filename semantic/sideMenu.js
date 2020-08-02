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
} from 'semantic-ui-react';
import { Link, animateScroll as scroll } from "react-scroll";

export default class SideBar extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      activeItem: "",
      menuVisible: true,
      rotate: false
    };
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
                <Sidebar style={{cursor: "pointer"}} as={Menu} position="left" animation="slide along" width='thin' className="sideBar" visible={this.state.menuVisible} vertical inverted>
                <Link to="jump-to-temperature" spy={true} smooth={true} offset={0} duration= {1000}>
                  <Menu.Item as="div" name='temperature' active={this.state.activeItem === 'temperature'}
                    onClick={this.handleItemClick}>Temperature</Menu.Item>
                    </Link>
                  <Link  to="jump-to-co2" spy={true} smooth={true} offset={0} duration= {1000}>
                  <Menu.Item as="div"  name='co2' active={this.state.activeItem === 'co2'}
                    onClick={this.handleItemClick}>Carbon Dioxide</Menu.Item>
                    </Link>
                    <Link to="jump-to-methane" spy={true} smooth={true} offset={0} duration= {1000}>
                  <Menu.Item as="div" name='methane' active={this.state.activeItem === 'methane'}
                    onClick={this.handleItemClick}>Methane</Menu.Item>
                    </Link>
                    <Link to="jump-to-nitrous" spy={true} smooth={true} offset={0} duration= {1000}>
                  <Menu.Item as="div" name='nitrous' active={this.state.activeItem === 'nitrous'}
                    onClick={this.handleItemClick}>Nitrous Oxide</Menu.Item>
                    </Link>
                    <Link to="jump-to-arctic" spy={true} smooth={true} offset={0} duration= {1000}>
                  <Menu.Item as="div" name='arctic' active={this.state.activeItem === 'arctic'}
                    onClick={this.handleItemClick}>Polar Ice</Menu.Item>
                    </Link>
                </Sidebar>
              </Sidebar.Pushable>
            </Grid.Column>
          </Grid>
        </Rail>
      </Sticky>

    </>
  }
}
