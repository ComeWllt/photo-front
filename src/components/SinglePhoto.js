import React, { Component } from 'react';
import { Image as ImageSemantic, Dimmer, Button } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import cloudinaryCore from '../config/cloudinary';
import loadingImage from '../images/image.png';
import '../styles/SinglePhoto.css';


class SinglePhoto extends Component {
  constructor(props) {
    super(props);
    this.handleShow = this.handleShow.bind(this);
    this.handleHide = this.handleHide.bind(this);
    this.state = {
      isLoaded: false,
      style: { opacity: '1', width: this.props.width, margin: '1%' },
    };
  }

  handleShow () {
    this.setState({ active: true, style: { opacity: '0.8', width: this.props.width, margin: '1%' } });
  }
  handleHide () {
    this.setState({ active: false, style: { opacity: '1', width: this.props.width, margin: '1%' } });
  }

  componentDidMount() {
    const downloadingImage = new Image();
    downloadingImage.src = cloudinaryCore.url(this.props.title + ' - min/' + this.props.photo);
    downloadingImage.onload = () => {
      this.setState({ isLoaded: true });
    };
  }

  render () { 
    const { active } = this.state;
    const isLoaded = this.state.isLoaded;
    const content = (
      <div>
        <Button size='large' color='red' circular icon='like'/>
        <Button size='large' color='black' circular icon='search' onClick={() => this.props.onClick(this.props.title + '/' + this.props.photo)}/>
      </div>
    );
    return (
      <Dimmer.Dimmable
        as={ImageSemantic}
        dimmed={active}
        dimmer={{ active, content }}
        onMouseEnter={this.handleShow}
        onMouseLeave={this.handleHide}
        className="photo"
        style={this.state.style}
        onLoad={ isLoaded ? this.props.onLoad : null}
        src={ isLoaded ? cloudinaryCore.url(this.props.title + ' - min/' + this.props.photo) : loadingImage}
      />
    );
  }
}

SinglePhoto.propTypes = {
  title: PropTypes.string,
  photo: PropTypes.string,
  onClick: PropTypes.func,
  width: PropTypes.string,
  onLoad: PropTypes.func,
};


export default SinglePhoto;
