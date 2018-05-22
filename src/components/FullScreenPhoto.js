import React, { Component } from 'react';
import { Image as ImageSemantic, Modal, Transition, Icon, Dimmer, Loader } from 'semantic-ui-react';
import cloudinaryCore from '../config/cloudinary';
import PropTypes from 'prop-types';
import '../styles/FullScreenPhoto.css';


class FullScreenPhoto extends Component {
  constructor(props) {
    super(props);
    this.handleChildClick = this.handleChildClick.bind(this);
    this.state = { isLoaded: false };
  }

  handleChildClick(e) {
    e.stopPropagation();
  }

  componentDidMount() {
    const downloadingImage = new Image();
    downloadingImage.src = cloudinaryCore.url(this.props.photo);
    downloadingImage.onload = () => {
      this.setState({ isLoaded: true });
    };
  }
  
  render() {
    const isLoaded = this.state.isLoaded;

    return (
      <Modal 
        open={this.props.open}
        onClose={this.props.close}
        basic
        dimmer='inverted'
        onClick={this.props.close}
      >
        {
          isLoaded ?
            <div className="container" id="image" >
              <Icon  
                name='close' 
                className="close" 
                size='large' 
                color='red' 
                link 
                onClick={this.props.close} />
              <Transition transitionOnMount animation='fade' duration={1100} >
                <ImageSemantic 
                  className="FullScreen" 
                  src={cloudinaryCore.url(this.props.photo)}
                  onClick={(this.handleChildClick)}
                />
              </Transition>

            </div>
            :
            <div className="container" id="image" >
              <Dimmer active inverted>
                <Loader indeterminate size='large'>Image loading</Loader>   
              </Dimmer>
            </div>
        }
      </Modal>
    );
  }
}

FullScreenPhoto.propTypes = {
  photo: PropTypes.string,
  open: PropTypes.bool,
  close: PropTypes.func,
};


export default FullScreenPhoto;
