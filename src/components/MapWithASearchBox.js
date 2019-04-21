import React from 'react';
import GOOGLE_MAPS_API_KEY from '../../Config_Keys';
import SideBar from './Sidebar';
import '../styles/App.css';
const _ = require("lodash");
const { compose, withProps, lifecycle } = require("recompose");
const {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker
} = require("react-google-maps");
const { SearchBox } = require("react-google-maps/lib/components/places/SearchBox");

const MapWithASearchBox = compose(
  withProps({
    googleMapURL: "https://maps.googleapis.com/maps/api/js?key=" + GOOGLE_MAPS_API_KEY + "&v=3.exp&libraries=geometry,drawing,places",
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ width: '100vw',height: '100vh' }} />,
    mapElement: <div style={{ height: `100%` }} />,
  }),
  lifecycle({
    componentWillMount() {
      const refs = {}

      const location = window.navigator && window.navigator.geolocation;
      if (location) {
        location.getCurrentPosition((position) => {
          //console.log(position);
          this.setState({
            center:{
              lat : position.coords.latitude,
              lng : position.coords.longitude
            }
          })
          
          
        }, (error) => {
           axios.get(`https://ipinfo.io/json?token=c856b5b1bb5718`)
            .then(response => {
              console.log('Response from svc: ', response);
              this.setState({
                center:{
                  lat : parseFloat(response.data.loc.split(',')[0]),
                  lng : parseFloat(response.data.loc.split(',')[1])
                }
              })
              
            })

        })
      }

      this.setState({
        bounds: null,
        /* center: {
          lat: lat, lng: lng
        }, */
        markers: [],
        onMapMounted: ref => {
          refs.map = ref;
        },
        onBoundsChanged: () => {
          this.setState({
            bounds: refs.map.getBounds(),
            center: refs.map.getCenter(),
          })
        },
        onSearchBoxMounted: ref => {
          refs.searchBox = ref;
        },
        onPlacesChanged: () => {
          const places = refs.searchBox.getPlaces();
          const bounds = new google.maps.LatLngBounds();

          places.forEach(place => {
            if (place.geometry.viewport) {
              bounds.union(place.geometry.viewport)
            } else {
              bounds.extend(place.geometry.location)
            }
          });
          const nextMarkers = places.map(place => ({
            position: place.geometry.location,
          }));
          const nextCenter = _.get(nextMarkers, '0.position', this.state.center);

          this.setState({
            center: nextCenter,
            markers: nextMarkers,
          });
          // refs.map.fitBounds(bounds);
        },
      })
    },
  }),
  withScriptjs,
  withGoogleMap,
)(props =>
  
  <GoogleMap
    ref={props.onMapMounted}
    defaultZoom={15}
    center={props.center}
    onBoundsChanged={props.onBoundsChanged}
  >
    <SideBar/>
    <SearchBox
      ref={props.onSearchBoxMounted}
      bounds={props.bounds}
      controlPosition={google.maps.ControlPosition.TOP_LEFT}
      onPlacesChanged={props.onPlacesChanged}
    >
      <input
        type="text"
        placeholder="Search the place you want"
        style={{
          boxSizing: `border-box`,
          border: `1px solid transparent`,
          width: `240px`,
          height: `41px`,
          marginTop: `9px`,
          padding: `0 12px`,
          borderRadius: `3px`,
          boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`,
          fontSize: `14px`,
          outline: `none`,
          textOverflow: `ellipses`,
        }}
      />
    </SearchBox>
    {props.markers.map((marker, index) =>
      
      <Marker 
        key={index} 
        position={marker.position} 
        />
    )}
    
  </GoogleMap>
  
);

export default MapWithASearchBox;