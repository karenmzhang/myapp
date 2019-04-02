let Sandbox = require('docker-python-sandbox')
var express = require('express');
var router = express.Router();

const poolSize = 5
let mySandbox = new Sandbox({poolSize})

router.post('/', (req, res) => {
    res.setHeader('Content-Type', 'text/plain');
}



mySandbox.initialize(err => {
  if (err) throw new Error(`unable to initialize the sandbox: ${err}`)
  
  const code = 'print "Hello, world!"'
  const timeoutMs = 2 * 1000
  
  mySandbox.run({code, timeoutMs}, (err, result) => {
    if (err) throw new Error(`unable to run the code in the sandbox: ${err}`)
    
    console.log(result.stdout); // Hello, world!
  })
});
