var express = require('express');
var router = express.Router();

var requestTime = (req, res, next) => {
   req.requestTime = Date.now();
   next();
};
 
/* Log the current time and the body of the request */
router.use(requestTime)

router.post('/', (req, res) => {
      var responseText = req.body.code + '\n';
      responseText += 'Submitted at: ' + req.requestTime + '\n';
      res.send(responseText);
   })

module.exports = router;