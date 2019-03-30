import React from 'react';
import MapWithAMarker from './MapWithAMarker';
import SideBar from './Sidebar';
import Spinner from './Spinner';
import '../styles/App.css';
import GOOGLE_MAPS_API_KEY from '../../Config_Keys';
import api from '../api/api';

class MapSelectedLocation extends React.Component {
 state = {
        lat:null,
        lng:null,
        coordinates: [
                        { lat: 33.684566, lng: -117.826508 }, 
                        { lat: 34.052235, lng: -118.243683 }
                      ],
        temp: []
        }
     
    
    componentWillMount() {
      const location = window.navigator && window.navigator.geolocation;
      if (location) {
        location.getCurrentPosition((position) => {
          console.log(position)
          this.setState({
              lat: position.coords.latitude,
              lng: position.coords.longitude
          })
        }, (error) => {
          this.setState({
              lat: 'err-latitude',
              lng: 'err-longitude'
          })
        })
      }
    }

    componentDidMount() {
      api.get(`api/v1.0/locations?locationType=school`)
      .then(res => {
          const locations = res.data;
          const latlongs = [];

          locations.map(location =>{
            latlongs.push({
              lat:location.latitude,
              lng:location.longitude
            });
          });

          this.setState({ 
            temp:latlongs 
          });
        })
    } 

    render(){
        
        const { lat,lng}= this.state;
        const {temp} = this.state;
        { temp.length !==0 ? console.log(temp[0].lat + " "+ temp[0].lng + " "+ temp[1].lat + " "+temp[1].lng): console.log("Loading..")}
        //console.log("Temp array is: " + temp[0].lat + temp[0].lng + temp[1].lat + temp[1].lng);
        return(
                      
            <div id="App">
                <SideBar />
                <div id="page-wrap">
                {lat && lng ?(

                  <MapWithAMarker
                  googleMapURL={"https://maps.googleapis.com/maps/api/js?key=" + GOOGLE_MAPS_API_KEY + "&v=3.exp&libraries=geometry,drawing,places"}
                  loadingElement={<div style={{ height: `100%` }} />}
                  containerElement={<div style={{ width: '100vw',height: '100vh' }} />}
                  mapElement={<div style={{ height: `100%` }} />}
                  lat={lat}
                  lng={lng}
                  coordinates={this.state.coordinates}
                  />
                ): <Spinner/>}
                </div>
            </div>
             
        );
    }
}

export default MapSelectedLocation;