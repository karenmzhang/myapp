var express = require('express');
var {User, Snapshot} = require('../models/sequelize');
var router = express.Router();


// create a new snapshot 
router.post('/', (req, res) => {
    Snapshot.create(req.body)
	.then(() => res.send('snapshot successfully taken'));
    console.log("created a new snapshot")
});

// get all of this user's snapshots
router.get('/', (req, res) => {
    const body = req.body;

    User.findById(body.userId)
	.then();
})

module.exports = router;
