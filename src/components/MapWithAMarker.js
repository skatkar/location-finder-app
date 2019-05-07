import React from 'react';

import {
    withScriptjs,
    withGoogleMap,
    GoogleMap,
    Marker,
  } from "react-google-maps";
  
  const MapWithAMarker = withScriptjs(withGoogleMap(props =>
    <GoogleMap
      defaultZoom={12}
      defaultCenter={{ lat: parseFloat(props.lat), lng: parseFloat(props.lng) }}
    >

    {props.coordinates.length === 0 && 
        <Marker 
        icon="https://img.icons8.com/ios/50/000000/map-pin-filled.png"
        position={{ lat: parseFloat(props.lat), lng: parseFloat(props.lng) }}
        />
    }

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