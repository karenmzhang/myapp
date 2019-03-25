var express = require('express');
var router = express.Router();
var testData = require('./testData.json');

//var requestTime = (req, res, next) => {
router.post('/', (req, res) => {
    res.setHeader('Content-Type', 'text/plain');
    req.requestTime = Date.now();

    const { spawn } = require('child_process');
    const fs = require('fs');

    var fileName = __dirname + "/Tests" + "/Code.java";
    var compiledFileName = __dirname + "/Tests" + "/Code";
    var testFileName = __dirname + "/Tests" + "/Test.java";
    var compiledTestName = __dirname + "/Tests" + "/Test";
    var opts = {stdio: 'inherit'};
    //    console.log(fileName);
    fs.writeFileSync(fileName, req.body.code);

    var javac = spawn('javac', [fileName] );
    var responseText = "Failed to compile.\nstderr: ";

    javac.stderr.on('data', (data) => {
        if (!data.includes("Picked up JAVA_TOOL_OPTIONS"))
            responseText += data;
        console.log(`COMPILATION stderr: ${data}`);
    });

    var testName = "Test";
    const levelNumber = req.body.level;

    javac.on('close', (code) => {
	if (code === 0) {
	    responseText = "";
	    var testA;
	    childList = [];
	    for (var i = 0; i < testData.numberOfTests[levelNumber]; i++) {
		(function(i) {
		    let name = testName + levelNumber + "_" + i;
		    testA = spawn('java', ["-cp", __dirname + "/Tests", name]);
		    
		    testA.on('exit', (code, signal) => {
			console.log('test child process exited with'  +`code ${code} and signal ${signal}`);
		    });

		    testA.stdout.on('data', (data) => {
			responseText += data;
		    });

		    testA.stderr.on('data', (data) => {
			if (!data.includes("Picked up JAVA_TOOL_OPTIONS"))
			    responseText += data;
			console.log(`EXECUTION stderr: ${data}`);
		    });

		    testA.on('close', () => {
			console.log(name);
			console.log(responseText);
			childList.push(name);

			if(childList.length == testData.numberOfTests[levelNumber]) 
			    res.send(responseText);
		    });

		})(i)
	    }

/*	    var testA = spawn('java', ["-cp", __dirname, 'Test']);

	    testA.on('exit', function(code, signal) {
		console.log('test child process exited with'  +`code ${code} and signal ${signal}`);
	    });

	    testA.stdout.on('data', (data) => {
		responseText += data;
		console.log(`stdout: ${data}`);
	    });

	    testA.stderr.on('data', (data) => {
		if (!data.includes("Picked up JAVA_TOOL_OPTIONS"))
		    responseText += data;
		console.log(`EXECUTION stderr: ${data}`);
	    });

	    testA.on('close', () => {
		//responseText += 'Submitted at: ' + req.requestTime + '\n';
		res.send(responseText);
	    });
*/
	    /*var testC = spawn('javac', [testFileName]);

	    testC.on('close', (code) => {
		var testA = spawn('java', ["-cp", __dirname, 'Test']);

		testA.on('exit', function(code, signal) {
		    console.log('test child process exited with'  +`code ${code} and signal ${signal}`);
		});

		testA.stdout.on('data', (data) => {
		    responseText += data;
		    console.log(`stdout: ${data}`);
		});

		testA.stderr.on('data', (data) => {
		    if (!data.includes("Picked up JAVA_TOOL_OPTIONS"))
			responseText += data;
		    console.log(`EXECUTION stderr: ${data}`);
		});

		testA.on('close', () => {
		    //responseText += 'Submitted at: ' + req.requestTime + '\n';
		    res.send(responseText);
		});
	    });*/
	} else {
	    res.send(responseText);
	    console.log('code was not 0');
	}
    });
});
module.exports = router;
