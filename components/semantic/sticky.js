import React, {Component} from 'react';
import {Container, Image, Menu} from 'semantic-ui-react';
import Link from 'next/link';
import {slide as BurgerMenu} from 'react-burger-menu';

export default class StickySideBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            mediaQuery: false
        };
        this.mql;
    }

    componentDidMount() {
        this.mql = window.matchMedia('(max-width: 600px)');
        this.setState({mediaQuery: this.mql.matches});
        window.addEventListener("resize", this.checkFunc);
    }

    checkFunc = () => {
        if (this.mql.matches !== this.state.mediaQuery) {
            this.setState({mediaQuery: this.mql.matches});
        }
    }

    render() {
        return (
            <> {
                this.state.mediaQuery ? <BurgerMenu>
                    <Container id="home" className="menu-item">
                        <Link href="/">
                            <a>Home</a>
                        </Link>
                    </Container>
                    <Container id="about" className="menu-item">
                        <Link href="/news">
                            <a>News</a>
                        </Link>
                    </Container>
                    <Container id="contact" className="menu-item">
                        <Link href="/deforestation">
                            <a>Deforestation</a>
                        </Link>
                    </Container>
                    <Container id="deforestation" className="menu-item">
                        <Link href="/contact">
                            <a>Contact</a>
                        </Link>
                    </Container>
                </BurgerMenu> :
                // desktop menu 
                <Menu as='header' fixed='top' size='huge' className='chart-img--remove'>

                    <Container as='nav'>
                        <Link href='/' passHref>
                            <Menu.Item as='a' position='left'>
                                <Image size='mini' src='images/logo-planet-image.png'/>
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
            } </>
        );
    }
}
