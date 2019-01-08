var express = require('express');
var {User, Snapshot} = require('../models/sequelize');
var router = express.Router();

// create a new user
router.post('/', (req, res) => {
    User.create(req.body)
	.then(user => res.json(user));
    console.log("created a new user")
});

// get all users
router.get('/', (req, res) => {
    User.findAll().then(users => res.json(users));
})

module.exports = router;
