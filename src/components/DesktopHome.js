import React from 'react';
import { Segment } from 'semantic-ui-react';
import '../styles/DesktopHome.css';


function DesktopHome () {
  return (
    <Segment 
      inverted  
      vertical
      className='segmentBackgroundDesktop'             
      style={{
        minHeight: '91vh', 
        overflow: 'hidden',
      }}>
    </Segment>
  );
}


export default DesktopHome;
