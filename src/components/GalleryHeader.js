import React from 'react';
import { Grid, Segment, Header } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import MapComponent from './MapComponent';


function GalleryHeader (props) {
  return(
    <Grid stackable verticalAlign='middle' columns={2} 
      style={{marginTop: '1.2em', marginBottom: '0.8em', 'marginLeft': '0', 'marginRight': '0'}}>      
      <Grid.Column>
        <Header as='h2' attached='top'>
          {props.title}
        </Header>
        <Segment attached>
          <p>{props.description}</p>
        </Segment>
      </Grid.Column>
      <Grid.Column>
        <Segment style={{'padding': '0', 'height': '302px', 'borderWidth': '1px', 'borderColor': 'rgb(44, 46, 62)'}}>
          <MapComponent isMarkerShown lat={props.location.lat} lng={props.location.lng}/>
        </Segment>
      </Grid.Column>
    </Grid>
  );
}

GalleryHeader.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  location: PropTypes.object,
};


export default GalleryHeader;
