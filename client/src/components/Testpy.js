import React, { Component } from 'react';
import '../App.css';
import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input';
import {MuiThemeProvider, createMuiTheme, withStyles } from '@material-ui/core/styles';
import green from '@material-ui/core/colors/green';
import orange from '@material-ui/core/colors/orange';
import red from '@material-ui/core/colors/red';
import '../styles/darcula.css';
import {Controlled as CodeMirror} from 'react-codemirror2';
import {Redirect} from 'react-router-dom';
require('codemirror/mode/clike/clike');

class Testpy extends Component {
    constructor(props) {
        super(props);
	/*'Instructions: Print N question marks in a row, where N is given as a command line argument. You may assume that N will be an integer. If N is negative, do not print any question marks. \n\nExample: \nN = 6 \nOutput = ?????? \n'*/
	this.state = {
	    levelNumber: 0,
            output: '',
            user: '',
            testResults: [";;;fail"],
	    numberTestsPassing: 0,
            cursorActivity: [],
            customInput: '',
	    customInputDialog: false,
        };

        this.handleCustomInput = this.handleCustomInput.bind(this);
        this.handleCustomSubmit = this.handleCustomSubmit.bind(this);
    }


    handleCustomInput = event => {
        this.setState({customInput: event.target.value});
    }

    handleCustomSubmit = async e => {
        e.preventDefault();
        const response = await fetch('/api/py', {
            method: 'POST',
            headers: {'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                code: this.state.code,
                args: this.state.customInput}),
        });
        const body = await response.text();

        this.setState({output: body});
	this.setState({customInputDialog: true});
        this.setState({cursorActivity: []});
    };

    render() {
        const theme = createMuiTheme({
            palette: {
                primary: green,
                secondary: orange,
            },
            typography: {useNextVariants: true},
        });

	var options = {
            mode: 'text/x-java',
            lineNumbers: true,
            theme: 'darcula'
        };

	if (false) {
	    return <Redirect to="/"/>;
	}
	else {
	    return(
            <MuiThemeProvider theme={theme}>
                <div className = "level-box">
		    <div className = "level-header">
			{"Level " + this.state.levelNumber}
		    </div>
		    <div className = "parent-container">
			<div className="codemirror-box">

			    <CodeMirror
			    value={this.state.code}
			    options={options}
			    onBeforeChange={(editor, data, value) => {
				this.setState({code:value});
			    }}
			    onChange={(editor, data, value) => {
			    if (editor.getCursor().line !== this.state.cursorActivity[this.state.cursorActivity.length -1]) {
			    this.setState({
                            cursorActivity: [...this.state.cursorActivity, editor.getCursor().line]});

			    }
			    }}
			    />
			</div>
			<div className = "output-box">
			    <div className = "instructions-box">
			    {this.state.output}
			    </div>
			    <div className = "button-container">
				<div className = "input-container">
				    <Input id="custom-input" variant = "filled" disableUnderline = {true} fullWidth = {true} placeholder = "Enter custom inputs" value={this.state.customInput} onChange={this.handleCustomInput} />
				</div>
				<div className = "button-padding">
				    <Button variant = "contained" color = "secondary" display = "flex" flexwrap = "nowrap" style={{width: '175px'}} onClick = {this.handleCustomSubmit}>
				    Run python code
				    </Button>
				</div>
			    </div>
			    <div className = "button-container">
				<Button variant = "contained" color = "secondary" onClick = {this.handleRunAllTests}>
				Run all tests
				</Button>
				<Button variant = "contained" color = "primary" disabled = {this.state.numberTestsPassing>0? false : true} style = {this.state.numberTestsPassing > 0 ? {backgroundColor: "#4caf50"} : {backgroundColor: "#eeeeee" }} onClick = {this.handleNextLevel}>
				Next level
				</Button>
				<Button variant = "contained" onClick = {this.handleReset} style ={{backgroundColor: "#d32f2f"}}>
				Reset Code
				</Button>
			    </div>
			</div>
		    </div>
                </div>
            </MuiThemeProvider>
        );}
    }
}

export default Testpy;
