var express = require('express');
var router = express.Router();

router.post('/', (req, res) => {
	res.send("hello from docker");
});


module.exports = router;
