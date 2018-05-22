import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Card, Icon, Image as ImageSemantic } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import cloudinaryCore from '../config/cloudinary';
import loadingImage from '../images/image.png';
import '../styles/SingleAlbum.css';


class SingleAlbum extends Component {

  constructor(props) {
    super(props);
    this.state = { isLoaded: false };
  }

  componentDidMount() {
    const downloadingImage = new Image();
    downloadingImage.src = cloudinaryCore.url('AlbumCovers/' + this.props.album.albumCover);
    downloadingImage.onload = () => {
      this.setState({ isLoaded: true });
    };
  }

  render() {
    const isLoaded = this.state.isLoaded;
    return (
      <Card 
        raised 
      >
        <div
          className='album'
          style={{overflow: 'hidden'}} >
          <Link to={{pathname: '/albums/' + this.props.album.title, state: {selectedAlbum: this.props.album}}}>
            <ImageSemantic 
              src={ isLoaded ? cloudinaryCore.url('AlbumCovers/' + this.props.album.albumCover) : loadingImage}
              id='album'
              style={{ 
                minHeight: '100%',
                minWidth: '100%',
                objectFit: 'cover',
                objectPosition: '50% 50%',
              }} />
          </Link>
        </div>
        <Card.Content>
          <Card.Header>
            {this.props.album.title}
          </Card.Header>
          <Card.Meta>
            <span className='date'>
              { (new Date(this.props.album.date).toLocaleDateString('en-us', { year: 'numeric', month: 'long' })) }
            </span>
          </Card.Meta>
        </Card.Content>
        <Card.Content extra>
          <Icon name='picture' />
          {this.props.album.photos.length}
        </Card.Content>
      </Card>
    );
  }
}

SingleAlbum.propTypes = {
  album: PropTypes.object,
};


export default SingleAlbum;
