import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';


class Logout extends Component {

  componentDidMount() {
    sessionStorage.removeItem('jwtToken');
    this.props.onClick();
  }

  render() {
    return (
      <Redirect to="/login"/>
    );
  }
}

Logout.propTypes = {
  onClick: PropTypes.func,
};


export default Logout;
