import React, { Component } from 'react';
import { Menu, Segment, Button } from 'semantic-ui-react';
import { Route, Switch, Link, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import Logout from './Logout';
import Login from './Login';
import DesktopHome from './DesktopHome';
import PortfolioLoader from './PortfolioLoader';
import GalleryResponsive from './GalleryResponsive';
import AlbumLoader from './AlbumLoader';


class DesktopMenu extends Component {

  constructor(props) {
    super(props);
    this.state = {
      loggedIn: (sessionStorage.getItem('jwtToken')===null) ? false : true
    };
    this.handleLogOut = this.handleLogOut.bind(this);
    this.handleLogIn = this.handleLogIn.bind(this);
  }

  handleLogOut() {
    this.setState({ loggedIn: false });
  }

  handleLogIn() {
    this.setState({ loggedIn: true });
  }

  render() {
    const loggedIn = this.state.loggedIn;
    
    const MenuLink = ({ label, to, activeOnlyWhenExact }) => (
      <Route
        path={to}
        exact={activeOnlyWhenExact}
      >
        {
          ({ match }) => (
            <Link to={to} style={{ marginTop: 'auto', marginBottom: 'auto' }}>
              <Menu.Item className={match ? 'active' : ''}>
                {label}
              </Menu.Item >
            </Link>)
        }
      </Route>
    );
    
    return (
      <div>
        <Segment 
          inverted    
          vertical           
          style={{
            height: '9vh',
            backgroundColor: '#2c2e3e',
          }}>
          <Menu 
            fixed='top' 
            inverted 
            pointing 
            secondary 
            style={{
              backgroundColor: '#2c2e3e',
              padding: '0 1.5em',
              height: '9vh',
              border: 'none'
            }}
          >
            <MenuLink activeOnlyWhenExact={true} label='Home' to='/'/>
            <MenuLink label='Albums' to='/albums'/>
            <MenuLink label='Portfolio' to='/portfolio'/>
            <Menu.Item position='right' style={{ height: '10vh', marginTop: 'auto', marginBottom: 'auto' }}>
              <Link to='/logout'><Button inverted>Log out</Button></Link>
            </Menu.Item>
          </Menu>
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
                <DesktopHome/>
              ) : (
                <Redirect to="/login"/>
              )
            )}/> 
        </Switch>
      </div>
    );
  }
}

DesktopMenu.propTypes = {
  location: PropTypes.object,
};


export default DesktopMenu;
