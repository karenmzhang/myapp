var express = require('express');
var router = express.Router();

//var requestTime = (req, res, next) => {
router.post('/', (req, res) => {
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

    var javac = spawn('javac', [fileName], opts);

    //   var opts = {stdio: 'inherit'};
    //   var javac = spawn('javac', ['/Users/karenzhang/Documents/Princeton/Schoolwork_18-19/Thesis/myapp/HelloWorld.java'], opts);

    javac.on('close', (code) => {
	if (code === 0) {
	    console.log("inside javaa block");
	    var javaa = spawn('java', ["-cp", __dirname, 'Code']);
	    //            var javaa = spawn('java', ["-cp", '/Users/karenzhang/Documents/Princeton/Schoolwork_18-19/Thesis/myapp', 'HelloWorld']);

	    javaa.on('exit', function (code, signal) {
		console.log('child process exited with ' +`code ${code} and signal ${signal}`);
	    });

	    javaa.stdout.on('data', (data) => {
		output = data;

		var responseText = "";
		responseText += 'Submitted at: ' + req.requestTime + '\n';
		responseText += "Output: " + output + '\n';
		res.send(responseText);
		console.log(`stdout: ${data}`);
	    });

	    javaa.stderr.on('data', (data) => {
		console.error(`stderr: ${data}`);
	    });
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
