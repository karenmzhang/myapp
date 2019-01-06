import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import {Controlled as CodeMirror} from 'react-codemirror2';
require('codemirror/mode/clike/clike');

class App extends Component {
     state = {
        code: '',
        output: '',};

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
	    }}
	    />
	    <form onSubmit={this.handleSubmit}>
	    <input type="submit" value ="submit" id="submitButton"/>
	    </form>
	    <p>{this.state.output}</p>
	    </div>
	);
    }
}

export default App;
