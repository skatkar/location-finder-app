import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import MapHomeLocation from './../components/MapHomeLocation';
import MapSelectedLocation from './../components/MapSelectedLocation';
import NotFound from './../components/NotFound';

const AppRouter = () => (
    <Router>
        <div>
            <Switch>
                <Route path="/" component={MapHomeLocation} exact={true}/>
                <Route path="/location/:locationType" component={MapSelectedLocation}/>
                <Route component={NotFound}/>
            </Switch>
        </div>
        
    </Router>
);

export default AppRouter;