import React from 'react';
import MapWithAMarker from './MapWithAMarker';
import SideBar from './Sidebar';
import Spinner from './Spinner';
import '../styles/App.css';
import GOOGLE_MAPS_API_KEY from '../../Config_Keys';
import api from '../api/api';
import axios from 'axios';

class MapSelectedLocation extends React.Component {
 state = {
        lat:null,
        lng:null,
        city:null,
        coordinates: []
        
        }
     
    
    componentWillMount() {
      const location = window.navigator && window.navigator.geolocation;
      if (location) {
        location.getCurrentPosition((position) => {
          //console.log(position);
          this.setState({
              lat: position.coords.latitude,
              lng: position.coords.longitude
          })
        }, (error) => {
         
          axios.get(`https://ipinfo.io/json?token=c856b5b1bb5718`)
            .then(response => {
              console.log('Response from svc: ', response);
              this.setState({
                lat: parseFloat(response.data.loc.split(',')[0]),
                lng: parseFloat(response.data.loc.split(',')[1])
              })
            })

        })
      }
    }

        

    findSelectedLocations(){
      console.log("User city is: ", this.state.city);
      api.get(`api/v1.0/locations?locationType=${this.props.match.params.locationType}&city=${this.state.city}`)
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
            coordinates:latlongs 
          });
        })
    }

    ipLookUp(){
      axios.get(`https://ipinfo.io/json?token=c856b5b1bb5718`)
        .then(response => {
            this.setState({
              city:response.data.city
            })
            this.findSelectedLocations();
        })
    }

    componentDidMount() {
      this.ipLookUp();
      console.log("User selected choice", this.props.match.params.locationType);
    }

    componentDidUpdate(prevProps) {
      if(this.props.match.params.locationType != prevProps.match.params.locationType) {
        this.ipLookUp();
        console.log("User selected choice", this.props.match.params.locationType);
      }
    }

    render(){
        
        const { lat,lng}= this.state;
        const {coordinates} = this.state;
        { coordinates.length !==0 ? console.log(coordinates[0].lat + " "+ coordinates[0].lng + " "+ coordinates[1].lat + " "+coordinates[1].lng): console.log("Loading..")}
        
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