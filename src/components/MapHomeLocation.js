import React from 'react';
import MapWithAMarker from './MapWithAMarker';
import SideBar from './Sidebar';
import Spinner from './Spinner';
import '../styles/App.css';
import axios from 'axios';
import GOOGLE_MAPS_API_KEY from '../../Config_Keys';

const location = window.navigator && window.navigator.geolocation;

class MapHomeLocation extends React.Component {

    state = {
      homeLat: null,
      homeLng: null,
      homeLocation: {},
      coordinates: []
    }
    // New Code
    componentWillMount() {
      const location = window.navigator && window.navigator.geolocation;
      if (location ) {
        location.getCurrentPosition((position) => {
          this.setState({
            homeLat: (position.coords.latitude),
            homeLng: (position.coords.longitude)
          })
        }, (error) => {
          axios.get(`https://ipinfo.io/json?token=c856b5b1bb5718`)
            .then(response => {
              console.log('Response from svc: ', response);
              this.setState({
                homeLat: parseFloat(response.data.loc.split(',')[0]),
                homeLng: parseFloat(response.data.loc.split(',')[1])
              })
            })
        })
      }
    }

    render() {
        const  {homeLat,homeLng  } = this.state;
        
        console.log("Latitude:" + homeLat);
        console.log("Longitude:" + homeLng);

        
       return(
                      
          <div id="App">
              <SideBar />
              <div id="page-wrap">
              {homeLat && homeLng ? (

                <MapWithAMarker
                googleMapURL={"https://maps.googleapis.com/maps/api/js?key=" + GOOGLE_MAPS_API_KEY + "&v=3.exp&libraries=geometry,drawing,places"}
                loadingElement={<div style={{ height: `100%` }} />}
                containerElement={<div style={{ width: '100vw',height: '100vh' }} />}
                mapElement={<div style={{ height: `100%` }} />}
                lat={homeLat}
                lng={homeLng}
                coordinates={this.state.coordinates}
                />
              ):<Spinner/>}
              </div>
          </div>
           
      ); 
    }
  }
    export default MapHomeLocation;