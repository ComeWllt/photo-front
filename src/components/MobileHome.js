import React from 'react';
import { Segment } from 'semantic-ui-react';
import '../styles/MobileHome.css';


function MobileHome () {
  return (
    <Segment 
      inverted  
      vertical
      className='segmentBackgroundMobile'             
      style={{
        overflow: 'hidden',
        position: 'fixed',
        backgroundPositionY: '50%',
        backgroundPositionX: '29%',
        width: '100%',
        height: '100%'
      }}>
    </Segment>
  );
}


export default MobileHome;
