var express = require('express');
var {User, Snapshot} = require('../models/sequelize');
var router = express.Router();


// create a new snapshot 
router.post('/', (req, res) => {
    Snapshot.create(req.body)
	.then(snapshot => {
	    console.log("SNAPSHOT CREATED" + snapshot.get({
		plain: true
	    }));
	    User.find({where: {netid: req.body.netid}})
	    .then(user => {
		if (user) {
		    snapshot.setUser(user);
		    res.send();
		}
		else {
		    res.send();
		}
	    })
	})
});

// get all of this user's snapshots
/*router.get('/', (req, res) => {
    const body = req.body;

    User.findById(body.userId)
	.then();
})*/

module.exports = router;
