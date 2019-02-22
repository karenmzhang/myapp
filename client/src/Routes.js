import React, { Component } from 'react';
import Level from './components/Level';
import Login from './components/Login';
import Nomatch from './components/Nomatch';
import Validate from './components/Validate';
import {Route, Switch, Redirect} from 'react-router-dom';

class Routes extends Component {
    render() {
	return (
	    <div>
	    <Switch>
	    <Route exact path ="/login" component = {Login} />
	    <Route exact path = "/validate" component = {Validate} />
	    <Route exact path = "/level" component = {Level} />
	    <Route exact path = "/">
	    <Redirect to="/login" />
	    </Route>
	    <Route component ={Nomatch}/>
	    </Switch>
	    </div>
	);

    }
}

export default Routes;
