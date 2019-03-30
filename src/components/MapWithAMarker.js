import React from 'react';

import {
    withScriptjs,
    withGoogleMap,
    GoogleMap,
    Marker,
  } from "react-google-maps";
  
  const MapWithAMarker = withScriptjs(withGoogleMap(props =>
    <GoogleMap
      defaultZoom={10}
      defaultCenter={{ lat: (props.lat), lng: (props.lng) }}
    >

    {props.coordinates.length === 0 && 
        <Marker position={{ lat: (props.lat), lng: (props.lng) }}/>}

    {props.coordinates.length !== 0 && 
        
            props.coordinates.map((coordinate,index) => (
                <Marker 
                    key={index} 
                    position={{ lat: (coordinate.lat), lng: (coordinate.lng) }}
                />
            ))
    }    
      
    </GoogleMap>
  ));

  export default MapWithAMarker;