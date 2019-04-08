import React, { Component } from 'react';
import '../App.css';
import { Redirect } from 'react-router-dom';
import {MuiThemeProvider, createMuiTheme, withStyles } from '@material-ui/core/styles';
import green from '@material-ui/core/colors/green';
import orange from '@material-ui/core/colors/orange';
import CircularProgress from '@material-ui/core/CircularProgress';

class Validate extends Component {
    constructor(props) {
        super(props);
    }

    /*async componentDidMount() {
	console.log(this.state.levelNumber)
	console.log(this.props.location)
	if (!this.props.location || !this.props.location.state || !this.props.location.state.user) {
	    return
	}
	const response = await fetch('/api/user',
	{
            method: 'POST',
            headers: {'Content-Type': 'application/json',
            },
            body: JSON.stringify({
		netid: this.props.location.state.user
            }),
        });
	const body = await response.text();
	console.log("got level number from database " + body);
	this.setState({ levelNumber: parseInt(body) });
    }*/

    render() {
	const theme = createMuiTheme({
            palette: {
                primary: green,
                secondary: orange,
            },
            typography: {useNextVariants: true},
        });

	if (!this.props.location || !this.props.location.state || !this.props.location.state.user) {
            return <Redirect to="/"/>;
        }

	/*if (this.state.levelNumber < 0) {
	    return (
		<MuiThemeProvider theme={theme}>
		    <CircularProgress />
		</MuiThemeProvider>
	    )
	}*/
	else {
	    //return <Redirect to = "/testpy"/>
	    return <Redirect to={{
                pathname:'/level',
                state: {
		    user: this.props.location.state.user,
		}
	    }} />;
	}
    }
}
export default Validate;
