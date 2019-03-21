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
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContentText from '@material-ui/core/DialogContentText';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
require('codemirror/mode/clike/clike');

class Level extends Component {
    constructor(props) {
        super(props);
	this.state = {
	    instructions: 'Instructions: Print N question marks in a row, where N is given as a command line argument. You may assume that N will be an integer. If N is negative, do not print any question marks. \n\nExample: \nN = 6 \nOutput = ?????? \n',
            code: 'public class Code {\n  public static void main(String[] args) {\n    //write your code here\n\n  }\n}',
	    initialCode:'public class Code {\n  public static void main(String[] args) {\n    //write your code here\n\n  }\n}',
            output: '',
            user: '',
            testResults: ["fail"],
	    numberTestsPassing: 0,
            cursorActivity: [],
            customInput: '',
	    customInputDialog: false,
	    allTestsDialog: false,
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleNewUser = this.handleNewUser.bind(this);
        this.showLoadingMessage = this.showLoadingMessage.bind(this);
        this.handleCustomInput = this.handleCustomInput.bind(this);
        this.handleCustomSubmit = this.handleCustomSubmit.bind(this);
	this.handleRunAllTests = this.handleRunAllTests.bind(this);
	this.handleNextLevel = this.handleNextLevel.bind(this);
	this.handleReset = this.handleReset.bind(this);
	this.closeCustomInputDialog = this.closeCustomInputDialog.bind(this);
	this.closeAllTestsDialog = this.closeAllTestsDialog.bind(this);
	this.countTestsPassing = this.countTestsPassing.bind(this);
    }

    countTestsPassing() {
	const arr = this.state.testResults;
	let count = 0;
	for (let i = 0; i < arr.length; i++) {
	    if (arr[i].trim() === "pass".trim()) {
		count++;
	    }
	    else {
		console.log(arr[i]);
		console.log("pass");
	    }
	}
	console.log(count);
	this.setState({numberTestsPassing: count});
	return count;
    }

    closeCustomInputDialog() {
	this.setState({customInputDialog: false});
    }

    closeAllTestsDialog() {
	this.setState({allTestsDialog: false});
    }

    handleNewUser() {

    }

    handleRunAllTests = async e => {
        e.preventDefault();
        const response = await fetch('/api/runTests', {
            method: 'POST',
            headers: {'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                code: this.state.code}),
        });
        const body = await response.text();

        this.setState({output: body});

	this.setState({testResults: body.split(",")});
	this.countTestsPassing();
        /*const response2 = await fetch('/api/snapshot', {
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
        });*/
        this.setState({cursorActivity: []});
	this.setState({allTestsDialog: true});
    }

    handleNextLevel = event => {

    }

    handleReset = event => {
	const initialCode = this.state.initialCode;
	this.setState({code: initialCode}); 
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
	this.setState({customInputDialog: true});

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
			<div>
			    <Dialog
				open={this.state.customInputDialog}
				onClose={this.closeCustomInputDialog}
				disableBackdropClick = {true}
				fullWidth = {true}
				aria-labelledby="alert-dialog-title"
				aria-describedby="alert-dialog-description"
			    >
				<DialogTitle id="alert-dialog-title">{"Custom Input Results:"}</DialogTitle>
				<DialogContent>
				    <pre className = "word-wrap-needed">{this.state.output}</pre>
				</DialogContent>
				<DialogActions>
				    <Button onClick={this.closeCustomInputDialog} color="primary">
				    Close
				    </Button>
				</DialogActions>
			    </Dialog>
			</div>
			<div>
			    <Dialog
				open={this.state.allTestsDialog}
				onClose={this.closeAllTestsDialog}
				disableBackdropClick = {true}
				fullWidth = {true}
				aria-labelledby="alert-dialog-title"
				aria-describedby="alert-dialog-description"
			    >
				<Paper>
				<DialogTitle id="alert-dialog-title">{"Test Results:"}</DialogTitle>
				</Paper>
				<DialogContent>
				    <Table>
					<TableHead>
					    <TableRow>
						<TableCell>Result</TableCell>
					    </TableRow>
					</TableHead>
					<TableBody>
					    <TableRow>
						<TableCell>{this.state.testResults[0]} </TableCell>
					    </TableRow>
		
					    <TableRow>
						<TableCell> {this.state.testResults[1]}</TableCell>
					    </TableRow>
		
					    <TableRow>
						<TableCell>  {this.state.testResults[2]}</TableCell>
					    </TableRow>

					    <TableRow>
						<TableCell> { this.state.testResults[3]}</TableCell>
					    </TableRow>
					    
					    <TableRow>
						<TableCell align = "right" > 
						    Summary: passed {this.state.numberTestsPassing}/{this.state.testResults.length} tests
						</TableCell>
					    </TableRow>
					</TableBody>
				    </Table>
				</DialogContent>
				<DialogActions>
				    <Button onClick={this.closeAllTestsDialog} color="primary"
					disabled = {this.state.numberTestsPassing > 0? false : true}>
				    Next Level
				    </Button>
				    <Button onClick={this.closeAllTestsDialog} color="primary">
				    Close
				    </Button>
				</DialogActions>
			    </Dialog>
			</div>
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
			    {this.state.instructions}
			    </div>
			    <div className = "button-container">
				<div className = "input-container">
				    <Input id="custom-input" variant = "filled" disableUnderline = {true} fullWidth = {true} placeholder = "Enter custom inputs" value={this.state.customInput} onChange={this.handleCustomInput} />
				</div>
				<div className = "button-padding">
				    <Button variant = "contained" color = "secondary" display = "flex" flexwrap = "nowrap" style={{width: '175px'}} onClick = {this.handleCustomSubmit}>
				    Run custom input
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

export default Level;
