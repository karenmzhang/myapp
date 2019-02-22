import React, { Component } from 'react';
import '../App.css';
import Button from '@material-ui/core/Button';
import {MuiThemeProvider, createMuiTheme, withStyles } from '@material-ui/core/styles';
import green from '@material-ui/core/colors/green';
import orange from '@material-ui/core/colors/orange';
import red from '@material-ui/core/colors/red';

class Validate extends Component {
    constructor(props) {
        super(props);

        this.handleLogin = this.handleLogin.bind(this);
    }

    handleLogin = async e => {
    }

    render() {
        const theme = createMuiTheme({
            palette: {
                primary: green,
                secondary: orange,
            },
            typography: {useNextVariants: true},
        });

        return(
            <MuiThemeProvider theme={theme}>
            <div className = "login-box">
            <Button variant = "contained" color = "secondary" onClick = {this.handleLogin}>
            Validate
            </Button>
            </div>
            </MuiThemeProvider>
        );
    }
}
export default Validate;
