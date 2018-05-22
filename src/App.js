import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Responsive } from 'semantic-ui-react';

import DesktopMenu from './components/DesktopMenu';
import MobileMenu from './components/MobileMenu';


class App extends Component {
  render() {
    return (
      <div>
        <Responsive minWidth={992} >
          <Router>
            <Route path='/' component={DesktopMenu} />
          </Router>
        </Responsive>
        <Responsive maxWidth={991} >
          <Router>
            <Route path='/' component={MobileMenu} />
          </Router>
        </Responsive>
      </div>
    );
  }
}

export default App;
