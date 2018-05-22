import React, { Component } from 'react';
import { Loader, Dimmer, Segment } from 'semantic-ui-react';
import Albums from './Albums';
import API_URL from '../config/api';


const API = API_URL+'/api/albums';

class AlbumLoader extends Component {
  
  constructor(props) {
    super(props);
    this.options = {
      headers: { 'Authorization': sessionStorage.getItem('jwtToken') }
    };
    this.state = {
      albums: [],
      isLoading: true,
      error: null,
    };
  }

  componentDidMount() {
    this.setState({ isLoading: true });
    fetch(API, this.options)
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Something went wrong ...');
        }
      })
      .then(data => this.setState({ albums: data, isLoading: false }))
      .catch(error => this.setState({ error, isLoading: false }));
  }

  render() {
    const { albums, isLoading, error } = this.state;
    if (error) {
      return <p>{error.message}</p>;
    }
    if (isLoading) {
      return (
        <Segment
          style={{
            height: '60vh',
            border: 'none',
            boxShadow: 'none'
          }}  
        >
          <Dimmer active inverted>
            <Loader size='large'>Loading</Loader>      
          </Dimmer>
        </Segment>
      );
    }
    return (
      <Albums albums={albums}/>
    );
  }
}


export default AlbumLoader;
