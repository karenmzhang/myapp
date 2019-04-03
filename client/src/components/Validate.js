import React, { Component } from 'react';
import '../App.css';
import { Redirect } from 'react-router-dom';

class Validate extends Component {
    constructor(props) {
        super(props);

    }

    render() {
	if (!this.props.location.state.user) {
            return <Redirect to="/"/>;
        }
	else {
	    //return <Redirect to = "/testpy"/>
	    return <Redirect to={{
                pathname:'/level',
                state: {user: this.props.location.state.user}
            }} />;
	}
    }
}
export default Validate;
