import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import './styles/darcula.css';
import {Controlled as CodeMirror} from 'react-codemirror2';
import Button from '@material-ui/core/Button';
import {MuiThemeProvider, createMuiTheme, withStyles } from '@material-ui/core/styles';
import green from '@material-ui/core/colors/green';
import orange from '@material-ui/core/colors/orange';
import red from '@material-ui/core/colors/red';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
require('codemirror/mode/clike/clike');

class App extends Component {
    constructor(props) {
	super(props);
	this.state = {
	    code: 'public class Code {\n    public static void main(String[] args) {\n	//write your code here\n\n    }\n}',
	    output: '',
	    user: '',
	    testResults: [false, false, false],
	    cursorActivity: [],
	    customInput: '',
	};

	this.handleUserChange = this.handleUserChange.bind(this);
	this.handleSubmit = this.handleSubmit.bind(this);
	this.handleNewUser = this.handleNewUser.bind(this);
	this.handleGetAllUsers = this.handleGetAllUsers.bind(this);
	this.showLoadingMessage = this.showLoadingMessage.bind(this);
	this.handleCustomInput = this.handleCustomInput.bind(this);
	this.handleCustomSubmit = this.handleCustomSubmit.bind(this);
	this.handleLogin = this.handleLogin.bind(this);
    }

/*    async componentDidMount() {
	console.log(this.state.code);
        const response = await fetch('/api/submit', {
            method: 'POST',
            headers: {'Content-Type': 'application/json',
            },
            body: JSON.stringify({
		code: this.state.code}),
	    
        });
        const body = await response.text();

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
	//this.callApi()
	//    .then(res => {})
	//    .catch(err => console.log(err));
    }*/
    
    handleLogin = async e => {
	e.preventDefault();
	window.location = "https://fed.princeton.edu/cas/login?service=http://localhost:3000";
	/*
	const response = await fetch('/api/auth/login', {
	    method: 'GET',
	});
	const body = await response.text();
	console.log(body);
	*/
    }

    handleGetAllUsers = async e => {
	e.preventDefault();
	const response = await fetch('/api/user', {
	    method: 'GET',
	});
	const body = await response.json();
	if (response.status !== 200) //console.log(body.message);
	else //console.log(body);
    }
    
    handleNewUser = async e => {
	e.preventDefault();
	const response = await fetch('/api/user', {
	    method: 'POST',
	    headers: {'Content-Type': 'application/json',
	    },
	    body: JSON.stringify({name: this.state.user}),
	});
	const body = await response.text();
	if (response.status !== 200) //console.log(body.message);

	this.setState({user: ''});
    }

    handleUserChange(event) {
	this.setState({user: event.target.value});
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
	//console.log(body2);
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
	//console.log(body2);
	this.setState({cursorActivity: []});
    };

    showLoadingMessage() {
	this.setState({output: "Compiling and running your code..."});
    }
    

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
	if (this.state.user) {
	    return (
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
		    //console.log(editor.getCursor().line);
		    //console.log(editor.getCursor().ch);
		    if (editor.getCursor().line !== this.state.cursorActivity[this.state.cursorActivity.length -1]) {
			this.setState({
			    cursorActivity: [...this.state.cursorActivity, editor.getCursor().line]});

		    }
		    //	console.log(editor.getCursor());
		    //console.log(this.state.cursorActivity);
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
		<Button variant = "contained" color = "secondary" onClick = {this.handleCustomSubmit}>
		Run_custom_input
		</Button>
		</div>
		</div>	
		<div className = "button-container">
		<Button variant = "contained" color = "secondary" onClick = {this.handleSubmit}>
		Run all tests
		</Button>
		<Button variant = "contained" color = "primary" onClick = {this.handleSubmit}>
		Next level
		</Button>
		<Button variant = "contained" onClick = {this.handleSubmit}>
		Reset
		</Button>
		</div>	
		</div>
		</div>
		</div>
		</MuiThemeProvider>
	    );
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
    }
}

export default App;
