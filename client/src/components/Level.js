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

class Level extends Component {
    constructor(props) {
        super(props);
	this.state = {
            code: 'public class Code {\n    public static void main(String[] args) {\n  //write your code here\n\n    }\n}',
            output: '',
            user: '',
            testResults: [false, false, false],
            cursorActivity: [],
            customInput: '',
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleNewUser = this.handleNewUser.bind(this);
        this.showLoadingMessage = this.showLoadingMessage.bind(this);
        this.handleCustomInput = this.handleCustomInput.bind(this);
        this.handleCustomSubmit = this.handleCustomSubmit.bind(this);
	this.handleRunAllTests = this.handleRunAllTests.bind(this);
	this.handleNextLevel = this.handleNextLevel.bind(this);
	this.handleReset = this.handleReset.bind(this);
    }

    handleNewUser() {

    }

    handleRunAllTests = event => {

    }

    handleNextLevel = event => {

    }

    handleReset = event => {
	this.setState({code: 'public class Code {\n    public static void main(String[] args) {\n  //write your code here\n\n        }\n}'});
    }

    handleCustomInput = event => {
        this.setState({customInput: event.target.value});
    }

    handleCustomSubmit = async e => {
        this.showLoadingMessage();
        e.preventDefault();
        const response = await fetch('/api/submit', {
            method: 'POST',
            headers: {'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                code: this.state.code,
                args: this.state.customInput}),
        });
        const body = await response.text();

        this.setState({output: body});

        const response2 = await fetch('/api/snapshot', {
            method: 'POST',
            headers: {'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                codeState: this.state.code,
                buttonPressed: 0,
                level: 0,
                testResults: this.state.testResults,
                output: this.state.output,
                cursorActivity: this.state.cursorActivity,
            }),
        });
        const body2 = await response2.text();
        console.log(body2);
        this.setState({cursorActivity: []});
    };

    handleSubmit = async e => {
        this.showLoadingMessage();
        e.preventDefault();
        const response = await fetch('/api/submit', {
            method: 'POST',
            headers: {'Content-Type': 'application/json',
            },
            body: JSON.stringify({code: this.state.code}),
        });
        const body = await response.text();

        this.setState({output: body});

        const response2 = await fetch('/api/snapshot', {
            method: 'POST',
            headers: {'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                codeState: this.state.code,
                buttonPressed: 0,
                level: 0,
                testResults: this.state.testResults,
                output: this.state.output,
                cursorActivity: this.state.cursorActivity,
            }),
        });
        const body2 = await response2.text();
        console.log(body2);
        this.setState({cursorActivity: []});
    };

    showLoadingMessage() {
        this.setState({output: "Compiling and running your code..."});
    }

    /*componentDidMount() {
	//console.log(this.props.location.search);
	var tick = this.props.location.search;
	if (!tick) {
	    this.setState({user: ''});
	    return;
	}
	//const casurl = 'https://fed.princeton.edu/cas/';
	//const query = "validate?service=";
	//const service = 'http://localhost:3000';
	//const ticketquery = "&ticket=";
	tick = tick.substring(8,tick.length);
	//console.log(tick);
	// send this to the express app to do instead.
	/*const response = fetch('/api/auth/verify', {
		method: 'POST',
            headers: {'Content-Type': 'application/json',
            },
            body: JSON.stringify({ticket: tick}),}
	)
	    .then(console.log(response));
	    
    }*/
/*
    componentDidMount() {
	// need to use props instead of set state for this.
	const newuser = this.props.location.state.user;
	this.setState({user: newuser});
	console.log(this.state.user);
    }
*/
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

	if (!this.props.location.state.user) {
	    return <Redirect to="/"/>;
	}
	else {
	    return(
            <MuiThemeProvider theme={theme}>
                <div className = "level-box">
		    <div className = "level-header">
			{"Level 0"}
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
				<pre className = "word-wrap-needed">{this.state.output}</pre>
			    </div>
			    <div className = "button-container">
				<div className = "input-container">
				    <Input id="custom-input" variant = "filled" disableUnderline = {true} fullWidth = {true} placeholder = "Enter custom inputs" value={this.state.customInput} onChange={this.handleCustomInput} />
				</div>
				<div className = "button-padding">
				    <Button variant = "contained" color = "secondary" display = "flex" flexWrap = "nowrap" style={{width: '175px'}} onClick = {this.handleCustomSubmit}>
				    Run custom input
				    </Button>
				</div>
			    </div>
			    <div className = "button-container">
				<Button variant = "contained" color = "secondary" onClick = {this.handleRunAllTests}>
				Run all tests
				</Button>
				<Button variant = "contained" color = "primary" onClick = {this.handleNextLevel}>
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

export default Level;
