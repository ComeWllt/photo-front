import React, { Component } from 'react';
import { Button, Form, Grid, Header, Segment, Transition } from 'semantic-ui-react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import API_URL from '../config/api';


const API = API_URL+'/api/signin';

class Login extends Component {

  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      loggedIn: false,
      error: false,
      shake: true
    };
    this.handleChangeUsername = this.handleChangeUsername.bind(this);
    this.handleChangePassword = this.handleChangePassword.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  
  handleChangeUsername(event) {
    this.setState({username: event.target.value});
  }

  handleChangePassword(event) {
    this.setState({password: event.target.value});
  }

  handleSubmit(event) {
    const auth = {
      username: this.state.username,
      password: this.state.password
    };
    const options = {
      method: 'POST',
      body: JSON.stringify(auth),
      headers: { 'Content-Type': 'application/json' }
    };
    fetch(API, options)
      .then(res => res.json())
      .then(res => {
        if (res.success) {
          this.props.onClick();
        }
        this.setState({ loggedIn: res.success });
        res.success ? 
          sessionStorage.setItem('jwtToken', res.token) 
          : 
          this.setState({ error: true, shake: !this.state.shake });
      });
    event.preventDefault();
  }

  render() {

    const loggedIn = this.state.loggedIn;
    const error = this.state.error;
    const shake = this.state.shake;

    return (

      loggedIn ? 

        <Redirect to="/"/>

        :

        <Segment style={{ padding: '8em 0em' }} vertical>
          <Grid container stackable verticalAlign='middle'>
            <Grid.Column>
              <div className='login-form'>
                <style>{`
                  body > div,
                  body > div > div,
                  body > div > div > div.login-form {
                    height: 100%;
                  }
                `}</style>
                <Grid
                  textAlign='center'
                  style={{ height: '100%' }}
                  verticalAlign='middle'
                >
                  <Grid.Column style={{ maxWidth: 400 }}>
                    <Header as='h2' color='black' textAlign='center'>
                      {' '}Log-in to your account
                    </Header>
                    <Transition visible={shake} animation='shake' duration={500}>
                      <Form size='large' onSubmit={this.handleSubmit}>
                        <Segment stacked>
                          <Form.Input
                            fluid
                            icon='user'
                            iconPosition='left'
                            placeholder='Username'
                            value={this.state.username} 
                            onChange={this.handleChangeUsername}
                            error={error}
                          />
                          <Form.Input
                            fluid
                            icon='lock'
                            iconPosition='left'
                            placeholder='Password'
                            type='password'
                            value={this.state.password} 
                            onChange={this.handleChangePassword}
                            error={error}
                          />
                          <Button color='black' fluid size='large'>Login</Button>
                        </Segment>
                      </Form> 
                    </Transition>
                  </Grid.Column>
                </Grid>
              </div>
            </Grid.Column>
          </Grid>
        </Segment>
    );
  }
}

Login.propTypes = {
  onClick: PropTypes.func,
};


export default Login;
