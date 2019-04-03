import React, { Component } from 'react';
import '../App.css';
import Button from '@material-ui/core/Button';
import {MuiThemeProvider, createMuiTheme, withStyles } from '@material-ui/core/styles';
import green from '@material-ui/core/colors/green';
import orange from '@material-ui/core/colors/orange';
import red from '@material-ui/core/colors/red';
import { Redirect } from 'react-router-dom';

class Login extends Component {
    constructor(props) {
        super(props);
	this.state = {
            user: '',
        };

        this.handleLogin = this.handleLogin.bind(this);
    }

    componentDidMount() {
        var tick = this.props.location.search;
        if (!tick) {
            return;
        }
        tick = tick.substring(8,tick.length);
	console.log(tick);
	// express app verifies if a login has happened
        fetch('/api/auth/verify', {
                method: 'POST',
            headers: {'Content-Type': 'application/json',
            },
            body: JSON.stringify({ticket: tick}),}
        )
	    .then(res => res.json())
            .then(res => {
		this.setState({user: res.netid});
		console.log(res);
	    });
    }

    handleLogin = async e => {
        e.preventDefault();
        //window.location = "https://fed.princeton.edu/cas/login?service=http://localhost:3000";
	window.location = "https://fed.princeton.edu/cas/login?service=https://debuggr.herokuapp.com";
    }

    render() {
	// idea: render login button IF ticket; otherwise return a redirect component
	const theme = createMuiTheme({
            palette: {
                primary: green,
                secondary: orange,
            },
            typography: {useNextVariants: true},
        });

	if (this.state.user) {
	    return <Redirect to={{
		pathname:'/validate',
		state: {user: this.state.user}
	    }} />;
	}

	else {
	return(
	    <MuiThemeProvider theme={theme}>
	    <div className = "login-box">
	    <Button variant = "contained" color = "secondary" onClick = {this.handleLogin}>
	    Log in
	    </Button>
	    </div>
	    </MuiThemeProvider>
	);

    }
}}

export default Login;
