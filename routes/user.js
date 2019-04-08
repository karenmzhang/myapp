var express = require('express');
var {User, Snapshot} = require('../models/sequelize');
var router = express.Router();

// create a new user
router.post('/', (req, res) => {
    console.log("got post request for user")
    User.findOrCreate({where: {netid: req.body.netid}})
	.then(([user, created]) => {
	    if (created) {
		res.send('0');
	    } else {
		res.send("" + user.levelNumber)
	    }    
	})
});

// get all users
router.post('/saveLevel', (req, res) => {
    console.log("got post request to save level")
    User.find({where: {netid: req.body.netid}})
	.then(user => {
	    if (user) {
		user.update({
		    levelNumber: req.body.levelNumber
		});
		res.send();
	    }
	    else {
		res.send();
	    }
	})
})

module.exports = router;
