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
import CircularProgress from '@material-ui/core/CircularProgress';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import {levelData} from './levelData.js';
import instr0 from '../images/instr0.png';
import instr1 from '../images/instr1.png';
import instr2 from '../images/instr2.png';
import instr3 from '../images/instr3.png';
import instr4 from '../images/instr4.png';
import instr5 from '../images/instr5.png';
import instr6 from '../images/instr6.png';
import instr7 from '../images/instr7.png';
import instr8 from '../images/instr8.png';
import instr9 from '../images/instr9.png';
import instr10 from '../images/instr10.png';
import instr11 from '../images/instr11.png';
import instr12 from '../images/instr12.png';
import instr13 from '../images/instr13.png';
require('codemirror/mode/clike/clike');

const instrs = [
    instr0,
    instr1,
    instr2,
    instr3,
    instr4,
    instr5,
    instr6,
    instr7,
    instr8,
    instr9,
    instr10,
    instr11,
    instr12,
    instr13,
];

class Level extends Component {
    constructor(props) {
        super(props);
	/*'Instructions: Print N question marks in a row, where N is given as a command line argument. You may assume that N will be an integer. If N is negative, do not print any question marks. \n\nExample: \nN = 6 \nOutput = ?????? \n'*/
	this.state = {
	    levelNumber: 0,
	    instructions: levelData.description[0],
            code: levelData.codeHead[0] + levelData.starterCode[0],
	    initialCode:levelData.codeHead[0] + levelData.starterCode[0],
	    methodName: levelData.methodName[0],
	    className: levelData.className[0],
	    numberOfTests: levelData.numberOfTests[0],
            output: '',
            user: '',
            testResults: [],
	    numberTestsPassing: 0,
            cursorActivity: [],
            customInput: '',
	    customInputDialog: false,
	    allTestsDialog: false,
	    failedToCompileTestsDialog: false, 
	    showCircleLoaderCustomInput: false,
	    showCircleLoaderRunTests: false,
	    fetched: false,
	    instructionNumber : 0,
        };
	
	this.advanceInstruction = this.advanceInstruction.bind(this);
        this.handleNewUser = this.handleNewUser.bind(this);
	this.handleLogout = this.handleLogout.bind(this);
        this.handleCustomInput = this.handleCustomInput.bind(this);
        this.handleCustomSubmit = this.handleCustomSubmit.bind(this);
	this.handleRunAllTests = this.handleRunAllTests.bind(this);
	this.handleNextLevel = this.handleNextLevel.bind(this);
	this.handleReset = this.handleReset.bind(this);
	this.closeCustomInputDialog = this.closeCustomInputDialog.bind(this);
	this.closeAllTestsDialog = this.closeAllTestsDialog.bind(this);
	this.countTestsPassing = this.countTestsPassing.bind(this);
	this.setTestResults = this.setTestResults.bind(this);
	this.closeFailedToCompileDialog = this.closeFailedToCompileDialog.bind(this);
	this.sendSnapshot = this.sendSnapshot.bind(this);
	this.setupBeforeUnloadListener = this.setupBeforeUnloadListener.bind(this);
    }

    async componentDidMount() {
	this.setupBeforeUnloadListener();
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
        //console.log("got level number from database " + body);
        this.setState({ levelNumber: parseInt(body),
		fetched: true,
		user: this.props.location.state.user,
		instructions: levelData.description[parseInt(body)],
		code: levelData.codeHead[parseInt(body)] + this.props.location.state.user + levelData.starterCode[parseInt(body)],
		initialCode:levelData.codeHead[parseInt(body)] + this.props.location.state.user + levelData.starterCode[parseInt(body)],
		methodName: levelData.methodName[parseInt(body)],
		className: levelData.className[parseInt(body)],
		numberOfTests: levelData.numberOfTests[parseInt(body)],
	
	});
    }

    static getDerivedStateFromProps(props, state) {
	if (!props.location || !props.location.state || !props.location.state.user) {
	    //console.log(props)
	    //console.log(state.user)
	    //console.log("get derived state called, no props")
	    return null;
	}
	if (props.location.state.user !== state.user) {
	    //console.log(props.location.state.user)
	    return {

		user: props.location.state.user,
		
		instructions: levelData.description[state.levelNumber],
		code: levelData.codeHead[state.levelNumber] + props.location.state.user + levelData.starterCode[state.levelNumber],
		initialCode:levelData.codeHead[state.levelNumber] + props.location.state.user + levelData.starterCode[state.levelNumber],
		methodName: levelData.methodName[state.levelNumber],
		className: levelData.className[state.levelNumber],
		numberOfTests: levelData.numberOfTests[state.levelNumber],
	    };
	}
	return null;
    }

    setupBeforeUnloadListener() {
	window.addEventListener("beforeunload", (ev) => {
	    ev.preventDefault();
	    this.sendSnapshot(5, "", this.state.cursorActivity);
	});
    }

    advanceInstruction() {
	var instr = this.state.instructionNumber;
	if (instr >= 13) {
	    this.handleNextLevel();
	    return;
	}
	else {
	    this.setState({instructionNumber: instr+1});
	}
    }

    sendSnapshot(id, body, cursorAct) {
	let testR = this.state.testResults.map(row => row[3].trim() === 'pass');
	let code = this.state.code.substring(0,2000);
	let customInput = this.state.customInput.substring(0,255);
	let outputB = body.substring(0,255);
        const response = fetch('/api/snapshot', {
            method: 'POST',
            headers: {'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                codeState: code,
		netid: this.state.user,
                buttonPressed: id,
                level: this.state.levelNumber,
		customInputs: customInput,
                testResults: testR,
                cursorActivity: cursorAct,
                output: outputB,
            }),
        });
    }

    handleLogout() {
	this.sendSnapshot(4, "", this.state.cursorActivity);
	//window.location = "https://fed.princeton.edu/cas/logout?url=http://localhost:3000";
	window.location = "https://fed.princeton.edu/cas/logout?url=https://debuggr.herokuapp.com";
    }

    closeFailedToCompileDialog() {
	this.setState({failedToCompileTestsDialog: false});
    }

    setTestResults(s) {
	const separator = '\x07';
	let arr = s.split(separator);
	let arr2 = [];
	for (let i = 0; i < arr.length; i++) {
	    if (arr[i] !== "") {
		arr2.push( arr[i].split(';'));
		//console.log(arr2[i]);
	    }
	}
	//console.log(arr2.length);
	this.setState({testResults: arr2});
    }

    countTestsPassing() {
	const arr = this.state.testResults;
	let count = 0;
	for (let i = 0; i < arr.length; i++) {
	    if (arr[i][3].trim() === "pass".trim()) {
		count++;
	    }
	    else {
		//console.log(arr[i]);
		//console.log("pass");
	    }
	}
	//console.log(count);
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

	let cursorActivity = this.state.cursorActivity;
	this.setState({allTestsDialog: true,
	    showCircleLoaderRunTests: true,
	});
        const response = await fetch('https://lit-mesa-21652.herokuapp.com/runtests', {
	//const response = await fetch('http://localhost:8080/runtests', {
            method: 'POST',
            headers: {'Content-Type': 'application/json',
            },
            body: JSON.stringify({
		user: this.state.user,
		className: this.state.className,
		methodName: this.state.methodName,
		levelNumber: this.state.levelNumber,
		numberOfTests: this.state.numberOfTests,
		code: this.state.code
	    }),
        });

	const body = await response.json();
	if (body.FailedToCompile) {
	    this.setState({
		failedToCompileTestsDialog: true,
		output: body.Output, 
		showCircleLoaderRunTests: false,
	    });
	    this.sendSnapshot(1, body.Output, cursorActivity);
	    this.setState({cursorActivity: []});
	    return;
	}

        //this.setState({output: body});
	//console.log(body);
	const separator = '\x07';
	//console.log(body.Output.split(separator));
	this.setTestResults(body.Output);
	//this.setTestResults("6;??????;?;fail,1;?;?;pass,0;;?;fail,-1;;?;fail");
	//this.setState({testResults: body.split(",")});
	this.countTestsPassing();

	this.sendSnapshot(1, "", cursorActivity);
        this.setState({cursorActivity: []});
	this.setState({
		failedToCompileTestsDialog: false,
		showCircleLoaderRunTests: false,
	});
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
    }

    handleNextLevel = event => {
	this.sendSnapshot(2, "", this.state.cursorActivity);
        const response = fetch('https://lit-mesa-21652.herokuapp.com/nextlevel', {
	//const response = fetch('http://localhost:8080/nextlevel', {
            method: 'POST',
            headers: {'Content-Type': 'application/json',
            },
            body: JSON.stringify({
		user: this.state.user,
		className: this.state.className,
		methodName: this.state.methodName,
		levelNumber: this.state.levelNumber,
		numberOfTests: this.state.numberOfTests,
	    }),
        });
	let currentLevelNumber = this.state.levelNumber;
	let currentUser = this.state.user;
	this.setState({	levelNumber: currentLevelNumber+1,
			instructions: levelData.description[currentLevelNumber+1],
			code: levelData.codeHead[currentLevelNumber+1] + currentUser + levelData.starterCode[currentLevelNumber+1],
			initialCode:levelData.codeHead[currentLevelNumber+1] + currentUser + levelData.starterCode[currentLevelNumber+1],
			methodName: levelData.methodName[currentLevelNumber+1],
			className: levelData.className[currentLevelNumber+1],
			numberOfTests: levelData.numberOfTests[currentLevelNumber+1],
			testResults: [],
			numberTestsPassing: 0,
			cursorActivity: [],
			customInput: '',
			customInputDialog: false,
			allTestsDialog: false,
           });
	const response2 = fetch('/api/user/saveLevel', {
            method: 'POST',
            headers: {'Content-Type': 'application/json',
            },
            body: JSON.stringify({
		netid: this.state.user,
		levelNumber: currentLevelNumber +1, 
	    }),
        });
    }

    handleReset = event => {
	this.sendSnapshot(3, "", this.state.cursorActivity);
	const initialCode = this.state.initialCode;
	this.setState({code: initialCode,
	    cursorActivity: []}); 
    }

    handleCustomInput = event => {
        this.setState({customInput: event.target.value});
    }

    handleCustomSubmit = async e => {
        e.preventDefault();
	this.setState({customInputDialog: true,
			showCircleLoaderCustomInput: true});
	let cursorActivity = this.state.cursorActivity;
        const response = await fetch('https://lit-mesa-21652.herokuapp.com/runjava', {
	//const response = await fetch('http://localhost:8080/runjava', {
            method: 'POST',
            headers: {'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                code: this.state.code,
                args: this.state.customInput,
		user: this.state.user,
		className: this.state.className,
		methodName: this.state.methodName,
	    }),

        });
        const body = await response.text();
	//console.log(body);

        this.setState({output: body,
	    showCircleLoaderCustomInput: false});
	this.sendSnapshot(0, body, cursorActivity);
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

	if (!this.props.location || !this.props.location.state || !this.props.location.state.user) {
	    return <Redirect to="/"/>;
	}
	if (!this.state.fetched) {
	    return (
		<MuiThemeProvider theme = {theme}>
		    <div className = "level-box">
		    <CircularProgress />
		    </div>
		</MuiThemeProvider>
	    )
	}
	if (this.state.levelNumber == 0) {
	    return (
            <MuiThemeProvider theme={theme}>
                <div className = "level-box">
		    <Dialog
			open={this.state.levelNumber == 0}
			onClose={this.handleNextLevel}
			disableBackdropClick = {true}
			fullWidth = {true}
			maxWidth = 'xl'
			aria-labelledby="alert-dialog-title"
			aria-describedby="alert-dialog-description"
			>
		    	<DialogContent>
			    <img src = {instrs[this.state.instructionNumber]} style = {{width: '90%'}}/>
			</DialogContent>
			<DialogActions>
			    <Button onClick={this.advanceInstruction} color="primary">
			    Next
			    </Button>
			</DialogActions>
		    </Dialog>
                </div>
            </MuiThemeProvider>
	    );
	}
	else {
	    return(
            <MuiThemeProvider theme={theme}>
                <div className = "level-box">
		    <div className = "parent-container">
			<div className = "output-box">
			    <div className = "instructions-box">

			    <div className = "level-header">
				<div className = "level-number-box">
				    {"Level " + this.state.levelNumber}
				</div>
			    </div>
			    {this.state.instructions}
			    </div>
			    <div className = "button-container">
				<div className = "button-padding">
				    <Button variant = "contained" color = "secondary" display = "flex" flexwrap = "nowrap" style={{width: '175px'}} onClick = {this.handleCustomSubmit}>
					Run main method
				    </Button>
				</div>
				<div className = "input-container">
				    <Input id="custom-input" variant = "filled" disableUnderline = {true} fullWidth = {true} placeholder = "Enter command-line arguments" value={this.state.customInput} onChange={this.handleCustomInput} />
				</div>
			    </div>
			    <div className = "button-area-container">
				<Button variant = "contained" color = "secondary" style = {{ width: '19vw'}} onClick = {this.handleRunAllTests}>
				Run all tests
				</Button>
				<Button variant = "contained" color = "primary" disabled = {this.state.numberTestsPassing>0? false : true} style = {this.state.numberTestsPassing > 0 ? {backgroundColor: "#4caf50", width: '19vw'} : {backgroundColor: "#eeeeee", width: '19vw'}} onClick = {this.handleNextLevel}>
				Next level
				</Button>
			    </div>
			</div>
			<div>
			    <Dialog
				open={this.state.customInputDialog}
				onClose={this.closeCustomInputDialog}
				disableBackdropClick = {true}
				fullWidth = {true}
				aria-labelledby="alert-dialog-title"
				aria-describedby="alert-dialog-description"
			    >
				<DialogTitle id="alert-dialog-title">{"Main method outputs:"}</DialogTitle>
				<DialogContent>
				    {this.state.showCircleLoaderCustomInput ? 
					<div className = "circle-loader">
					<CircularProgress /> 
					</div>
					:	
					<pre className = "word-wrap-needed">{this.state.output}</pre>
				    }
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
				    {this.state.showCircleLoaderRunTests ? 
					<div className = "test-result-pad">
					<div className = "circle-loader">
					<CircularProgress /> 
					</div>
					</div>
					:
					(this.state.failedToCompileTestsDialog ?
					<div className = "test-result-pad-no-center">    
					<pre className = "word-wrap-needed">{this.state.output}</pre>
					</div>
					:
					<div>
					 <Table>
					<TableHead>
					    <TableRow>
						<TableCell>Input</TableCell>
						<TableCell>Correct Output</TableCell>
						<TableCell>Your Output</TableCell>
						<TableCell>Result</TableCell>
					    </TableRow>
					</TableHead>
					<TableBody>
					    {this.state.testResults.map(row => (
						<TableRow style = {row[3].trim() === "pass"? {backgroundColor: "#c8e6c9"}: {backgroundColor: "#ffcdd2"}}>
						    <TableCell>{row[0]}</TableCell>
						    <TableCell>{row[1]}</TableCell>
						    <TableCell>{row[2]}</TableCell>
						    <TableCell>{row[3]}</TableCell>
						</TableRow>
					    ))}	    
					    <TableRow>
						<TableCell colSpan={4} align = "right" > 
						    Summary: passed {this.state.numberTestsPassing}/{this.state.testResults.length} tests
						</TableCell>
					    </TableRow>
					</TableBody>
					</Table>
					</div>
				    )
				    }
				</DialogContent>
				<DialogActions>
				    <Button onClick={this.handleNextLevel} color="primary"
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
			    //console.log(this.state.cursorActivity);
			    }
			    }}
			    />
			    <div className = "reset-box">
				<Button variant = "contained" onClick = {this.handleReset}  style ={{backgroundColor: "#d32f2f"}}>
				Reset Code
				</Button>
				 <Button variant = "contained" onClick = {this.handleLogout} color = "secondary" style = {{width: '100px'}}>
				log out	
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
