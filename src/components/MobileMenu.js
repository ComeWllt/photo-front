import React, { Component } from 'react';
import { Menu, Segment, Button, Sidebar, Icon, Container } from 'semantic-ui-react';
import { Link, Route, Switch, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import Logout from './Logout';
import Login from './Login';
import MobileHome from './MobileHome';
import PortfolioLoader from './PortfolioLoader';
import GalleryResponsive from './GalleryResponsive';
import AlbumLoader from './AlbumLoader';


class MobileMenu extends Component {

  constructor(props) {
    super(props);
    this.handlePusherClick = this.handlePusherClick.bind(this);
    this.handleToggle = this.handleToggle.bind(this);
    this.handleLogOut = this.handleLogOut.bind(this);
    this.handleLogIn = this.handleLogIn.bind(this);
    this.state={ 
      sidebarOpened: false,
      loggedIn: (sessionStorage.getItem('jwtToken')===null) ? false : true
    };
  }

  handlePusherClick () {
    const sidebarOpened = this.state.sidebarOpened;
    if (sidebarOpened) this.setState({ sidebarOpened: false });
  }

  handleToggle() {
    this.setState({ sidebarOpened: !this.state.sidebarOpened });
  } 

  handleLogOut() {
    this.setState({ loggedIn: false });
  }

  handleLogIn() {
    this.setState({ loggedIn: true });
  }

  render() {
    const loggedIn = this.state.loggedIn;
    const sidebarOpened = this.state.sidebarOpened;

    const MenuLink = ({ label, to, activeOnlyWhenExact }) => (
      <Route
        path={to}
        exact={activeOnlyWhenExact}
      >
        {
          ({ match }) => (
            <Link to={to}>
              <Menu.Item className={match ? 'active' : ''}>{label}</Menu.Item >
            </Link>)
        }
      </Route>
    );
    return (
      <div>
        <Sidebar.Pushable>
          <Sidebar 
            as={Menu} 
            animation='slide along' 
            inverted 
            vertical 
            visible={sidebarOpened}
            style={{backgroundColor: '#2c2e3e'}}
          >
            <MenuLink activeOnlyWhenExact={true} label='Home' to='/'/>
            <MenuLink label='Albums' to='/albums'/>
            <MenuLink label='Portfolio' to='/portfolio'/>
            <MenuLink label='Log out' to='/logout'/>
          </Sidebar>

          <Sidebar.Pusher dimmed={sidebarOpened} onClick={this.handlePusherClick} style={{ minHeight: '100vh', background: 'white' }}>
            <Segment 
              inverted vertical 
              style={{
                backgroundColor: '#2c2e3e',
              }}
            >
              <Container>
                <Menu inverted secondary size='large'>
                  <Menu.Item onClick={this.handleToggle}>
                    <Icon size='large' name='sidebar' />
                  </Menu.Item>
                  <Menu.Item position='right'>
                    <Link to='/logout'><Button inverted>Log out</Button></Link>
                  </Menu.Item>
                </Menu>
              </Container>
            </Segment>
            <Switch>
              <Route path='/albums/:albumTitle' render={({ location }) => (
                loggedIn ? (
                  <GalleryResponsive key={location.state.selectedAlbum._id} album={location.state.selectedAlbum} isPortfolio={false}/>
                ) : (
                  <Redirect to="/login"/>
                )
              )}/>
              <Route path='/albums' render={() => (
                loggedIn ? (
                  <AlbumLoader/>
                ) : (
                  <Redirect to="/login"/>
                )
              )}/>
              <Route path='/portfolio'
                render={() => (
                  loggedIn ? (
                    <PortfolioLoader/>
                  ) : (
                    <Redirect to="/login"/>
                  )
                )}/> 
              <Route path='/logout'  render={() => (
                <Logout onClick={this.handleLogOut}/>
              )}/>
              <Route path='/login'  render={() => (
                <Login onClick={this.handleLogIn}/>
              )}/>          
              <Route path='/' 
                render={() => (
                  loggedIn ? (
                    <MobileHome/>
                  ) : (
                    <Redirect to="/login"/>
                  )
                )}/> 
            </Switch>
          </Sidebar.Pusher>
        </Sidebar.Pushable>
      </div>
    );
  }
}

MobileMenu.propTypes = {
  location: PropTypes.object,
};


export default MobileMenu;
