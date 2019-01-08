import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import {Controlled as CodeMirror} from 'react-codemirror2';
require('codemirror/mode/clike/clike');

class App extends Component {
    constructor(props) {
	super(props);
	this.state = {
	    code: '',
	    output: '',
	    user: '',
	    testResults: [false, false, false],
	    cursorActivity: [],
	};

	this.handleUserChange = this.handleUserChange.bind(this);
	this.handleSubmit = this.handleSubmit.bind(this);
	this.handleNewUser = this.handleNewUser.bind(this);
	this.handleGetAllUsers = this.handleGetAllUsers.bind(this);
    }

    async componentDidMount() {
	console.log(this.state.code);
        const response = await fetch('/api/submit', {
            method: 'POST',
            headers: {'Content-Type': 'application/json',
            },
            body: JSON.stringify({code: this.state.code}),
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
    }

    handleGetAllUsers = async e => {
	e.preventDefault();
	const response = await fetch('/api/user', {
	    method: 'GET',
	});
	const body = await response.json();
	if (response.status !== 200) console.log(body.message);
	else console.log(body);
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
	if (response.status !== 200) console.log(body.message);

	this.setState({user: ''});
    }

    handleUserChange(event) {
	this.setState({user: event.target.value});
    }

    handleSubmit = async e => {
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

    render() {
	var options = {
	    mode: 'text/x-java',
	    lineNumbers: true
	};
	return (
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
		if (editor.getCursor().line != this.state.cursorActivity[this.state.cursorActivity.length -1]) {
		    this.setState({
			cursorActivity: [...this.state.cursorActivity, editor.getCursor().line]});

		}
		//	console.log(editor.getCursor());
		//console.log(this.state.cursorActivity);
	    }}
	    />
	    <form onSubmit={this.handleSubmit}>
	    <input type="submit" value ="submit" id="submitButton"/>
	    </form>
	    <form onSubmit = {this.handleNewUser}> 
	    <input type="text" value={this.state.user} onChange={this.handleUserChange} />
	    <input type="submit" value ="register new user" id="userButton"/>
	    </form>
	    <form onSubmit={this.handleGetAllUsers}>
	    <input type="submit" value = "show all users" id="getUsers"/>
	    </form>
	    <pre>{this.state.output}</pre>
	    </div>
	);
    }
}

export default App;
