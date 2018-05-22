import React from 'react';
import { Responsive } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import Gallery from './Gallery';


function GalleryResponsive (props) {
  return(
    <div>
      <Responsive {...Responsive.onlyComputer}>
        <Gallery width='23%' album={props.album} isPortfolio={props.isPortfolio} />
      </Responsive>
      <Responsive {...Responsive.onlyTablet}>
        <Gallery width='31.33%' album={props.album} isPortfolio={props.isPortfolio} />
      </Responsive>
      <Responsive {...Responsive.onlyMobile}>
        <Gallery width='48%' album={props.album} isPortfolio={props.isPortfolio} />
      </Responsive>
    </div>
  );
}

GalleryResponsive.propTypes = {
  album: PropTypes.object,
  isPortfolio: PropTypes.bool,
};


export default GalleryResponsive;
