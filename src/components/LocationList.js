import React from 'react';
import axios from 'axios';
import api from '../api/api';

export default class LocationList extends React.Component {
    state = {
        locations: []
      }

      componentDidMount() {
        api.get(`api/v1.0/locations?locationType=school`)
        .then(res => {
            const locations = res.data;
            this.setState({ locations });
          })
      }
    
      render() {
        return (
          <table>
            <tbody>
            { this.state.locations.map(
                location => 
                    <tr>
                        <td>{location.locationType}</td>
                        <td>{location.latitude}</td>
                        <td>{location.longitude}</td>
                        <td>{location.description}</td>
                    </tr>
                    
            )}
            </tbody>
          </table>
        )
      }
}
