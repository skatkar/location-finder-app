import React from 'react';
import ReactDOM from 'react-dom';
import AppRouter from '../src/routers/AppRouter';
import LocationList from './components/LocationList';

/*ReactDOM.render(<LocationList/>,document.getElementById('app'));*/
ReactDOM.render(<AppRouter/>, document.getElementById('app'));