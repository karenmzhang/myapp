var express = require('express');
var router = express.Router();

//var requestTime = (req, res, next) => {
router.post('/', (req, res) => {
    res.setHeader('Content-Type', 'text/plain');
    req.requestTime = Date.now();

    const { spawn } = require('child_process');
    const fs = require('fs');

    /* fs.writeFile('HelloWorld.java', req.body.code, (err) => {
	 if (err) throw err;

	 console.log('file saved');
      });
     */

    var fileName = __dirname + "/Code.java";
    var compiledFileName = __dirname + "/Code";
    var opts = {stdio: 'inherit'};
    //    console.log(fileName);
    fs.writeFileSync(fileName, req.body.code);

    var javac = spawn('javac', [fileName]);

    var responseText = "Failed to compile.\nstderr: ";
    javac.stderr.on('data', (data) => {
	responseText += data;
	console.log(`COMPILATION stderr: ${data}`);
    })
    //   var opts = {stdio: 'inherit'};

    javac.on('close', (code) => {
	if (code === 0) {
	    responseText = "Compilation sucessful.\nOutput: "
	    //    console.log("inside javaa block");
	    var javaa = spawn('java', ["-cp", __dirname, 'Code']);

	    javaa.on('exit', function (code, signal) {
		console.log('child process exited with ' +`code ${code} and signal ${signal}`);
	    });

	    javaa.stdout.on('data', (data) => {
		output = data;

		responseText += output;
		console.log(`stdout: ${data}`);

		//res.end();
	    });

	    javaa.stderr.on('data', (data) => {
		responseText += data;
		console.log(`EXECUTION stderr: ${data}`);
	    });
	    
	    javaa.on('close', () => {
		responseText += 'Submitted at: ' + req.requestTime + '\n';
		res.send(responseText);
	    });
	} else {
	    responseText += 'Submitted at: ' + req.requestTime + '\n';
	    res.send(responseText);
	    console.log('code was not 0');
	}
    });

    // const child = spawn('javac HelloWorld.java');
    //const child = spawn('pwd');

    /*child.on('exit', function (code, signal) {
      console.log('child process exited with ' +
		  `code ${code} and signal ${signal}`);
   });

   child.stdout.on('data', (data) => {
      console.log(`child stdout:\n${data}`);
   });

   child.stderr.on('data', (data) => {
      console.error(`child stderr:\n${data}`);
      });*/
 //   next();
});

/* Log the current time and the body of the request */
//router.use(requestTime);

/*
const { spawn } = require('child_process');
const child = spawn('pwd');

child.on('exit', function (code, signal) {
      console.log('child process exited with ' +
		  `code ${code} and signal ${signal}`);
   });

child.stdout.on('data', (data) => {
      console.log(`child stdout:\n${data}`);
   });

child.stderr.on('data', (data) => {
      console.error(`child stderr:\n${data}`);
   }); 
 */
/*
router.post('/', (req, res) => {
    var responseText = "";
    responseText += 'Submitted at: ' + req.requestTime + '\n';
    responseText += "Output: " + output + '\n';
    res.send(responseText);
})*/

module.exports = router;
