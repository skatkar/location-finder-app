import axios from 'axios';

export default axios.create({
  baseURL: `https://location-finder-jenkins.appspot.com/`
});