var express = require('express');
var router = express.Router();
var CentralAuthenticationService = require('cas');
var {User, Snapshot} = require('../models/sequelize');

var casURL = 'https://fed.princeton.edu/cas/';

// what should this be? if it's just redirecting back to the homepage, or is it 
// redirecting to something that should be the server? in that case, process.env.port or localhost 5000?
var myservice = process.env.DATABASE_URL ? process.env.DATABASE_URL : "http://localhost:3000";

var cas = new CentralAuthenticationService({
    base_url: casURL,
    service: myservice
})

 router.use('*', function (req, res, next) {
  next()
})

router.get('*', (req, res) => {
    var ticket = req.query.ticket;
    if (typeof (ticket) === 'undefined') {
	res.redirect('/');
	return;
    }
    cas.validate(ticket, (err, status, netid) => {
	if (err) {
	    console.log(err);
	    res.sendStatus(500);
	    return;
	}

	User.findOrCreate({
	    where: {netid: 'netid'}
	}).then();

	res.redirect('/');
    })
})

router.get('/login', (req, res) => {
    res.redirect(casURL + 'login?service=' + myservice);
})

router.get('/verify', (req, res) => {
    var ticket = req.query.ticket;
    if (typeof (ticket) === 'undefined') {
	res.redirect('/');
	return;
    }
    cas.validate(ticket, (err, status, netid) => {
	if (err) {
	    console.log(err);
	    res.sendStatus(500);
	    return;
	}

	User.findOrCreate({
	    where: {netid: 'netid'}
	}).then();

	res.redirect('/');
    })
})

router.get('/logout', (req, res) => {
    res.redirect(casURL + 'logout?url=http://princetoncourses.com/');
})

module.exports.router = router;

