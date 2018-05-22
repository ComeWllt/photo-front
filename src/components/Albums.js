import React, { Component } from 'react';
import { Card, Container } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import SingleAlbum from './SingleAlbum';
import '../styles/Albums.css';


class Albums extends Component {

  render() {
    const albums = this.props.albums.map(
      (album) => <SingleAlbum key={album._id} album={album}/>
    );
    return (
      <Container className="AlbumList">
        <Card.Group stackable doubling itemsPerRow={3}>
          {albums}
        </Card.Group>
      </Container>
    );
  }
}

Albums.propTypes = {
  albums: PropTypes.array,
};


export default Albums;
