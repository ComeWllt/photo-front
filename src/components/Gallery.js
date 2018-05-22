import React, { Component } from 'react';
import { Container, Loader, Icon } from 'semantic-ui-react';
import Masonry from 'react-masonry-component';
import PropTypes from 'prop-types';
import SinglePhoto from './SinglePhoto';
import FullScreenPhoto from './FullScreenPhoto';
import GalleryHeader from './GalleryHeader';


class Gallery extends Component {

  constructor(props) {
    super(props);
    this.handleClickSearch = this.handleClickSearch.bind(this);
    this.hideFullScreenPhoto = this.hideFullScreenPhoto.bind(this);
    this.handleLoad = this.handleLoad.bind(this);
    this.onScroll = this.onScroll.bind(this);
    this.state = {
      loadedPhotosCount: 0,
      selectedPhoto: false,
      photos: this.props.album.photos.slice(0,this.props.album.photos.length > 28 ? 
        24 : this.props.album.photos.length
      ).map(
        (photo) => 
          <SinglePhoto 
            key={photo} 
            onLoad={this.handleLoad} 
            photo={photo} 
            title={this.props.album.title} 
            width={this.props.width} 
            onClick={this.handleClickSearch} />)
    };
  }

  componentDidMount() {
    window.addEventListener('scroll', this.onScroll, false);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.onScroll, false);
  }

  onScroll () {
    const photos = this.state.photos;
    const loadedPhotosCount = this.state.loadedPhotosCount;
    if (
      (window.innerHeight + window.scrollY) >= (document.body.scrollHeight - 250) 
        && (photos.length < this.props.album.photos.length) 
        && loadedPhotosCount===photos.length
    ) {
      this.props.album.photos.slice(photos.length,photos.length+12).map((photo) => 
        photos.push(
          <SinglePhoto 
            key={photo} 
            onLoad={this.handleLoad} 
            photo={photo} 
            title={this.props.album.title} 
            visible={true} 
            width={this.props.width} 
            onClick={this.handleClickSearch} />
        )
      );
      this.setState({ photos: photos });
    }
  }

  handleClickSearch(selectedPhotoRef) {
    this.setState({
      selectedPhoto: true,
      selectedPhotoRef: selectedPhotoRef,
    });
  }

  hideFullScreenPhoto() {
    this.setState({
      selectedPhoto: false,
    });
  }

  handleLoad() {
    this.setState((prevState) => ({
      loadedPhotosCount: prevState.loadedPhotosCount + 1
    }));
    this.forceUpdate();
  }

  render () {  
    const photos = this.state.photos;
    const selectedPhotoRef = this.state.selectedPhotoRef;
    const selectedPhoto = this.state.selectedPhoto;
    const loadedPhotosCount = this.state.loadedPhotosCount;

    return (
      <div>
        <FullScreenPhoto 
          key={selectedPhotoRef}
          photo={selectedPhotoRef} 
          open={selectedPhoto}
          close={this.hideFullScreenPhoto}
        />
        <Container style={{marginTop: '2em', marginBottom: '2em'}}>
          {
            this.props.isPortfolio ?
              null
              :
              <GalleryHeader 
                title={this.props.album.title} 
                description={this.props.album.description} 
                location={this.props.album.location}
              />
          }
          <Masonry                 
            className={'Gallery'}
            style={{zIndex: '1'}}
            options={{transitionDuration: '0s'}} >
            {photos}
          </Masonry>
        </Container>
        {loadedPhotosCount===this.props.album.photos.length ?
          <Container textAlign='center' style={{marginTop: '3em', opacity: '0.5'}}>
            This is the bottom 
            <Icon style={{marginBottom: '1.2em'}} disabled name='hand outline down' />
          </Container>
          :
          <Container style={{marginTop: '3em', marginBottom: '3em'}}>
            <Loader active inline='centered' size='large'/>
          </Container>
        }
      </div>
    );
  }
}

Gallery.propTypes = {
  isPortfolio: PropTypes.bool,
  width: PropTypes.string,
  album: PropTypes.object,
};


export default Gallery;
