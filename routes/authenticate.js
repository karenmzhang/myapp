var express = require('express');
var router = express.Router();
var CentralAuthenticationService = require('cas');
var {User, Snapshot} = require('../models/sequelize');

var casURL = 'https://fed.princeton.edu/cas/';

// what should this be? if it's just redirecting back to the homepage, or is it 
// redirecting to something that should be the server? in that case, process.env.port or localhost 5000?
var myservice = process.env.DATABASE_URL ? "https://debuggr.herokuapp.com" : "http://localhost:3000";
var myproxy = "http://localhost:5000";

var cas = new CentralAuthenticationService({
    base_url: casURL,
    service: myservice
})

 router.use('*', function (req, res, next) {
  next()
})

/*router.get('*', (req, res) => {
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
})*/

router.get('/login', (req, res) => {
    console.log("redirecting");
    res.redirect(casURL + 'login?service=' + myservice + "/api/auth/verify");
    res.send("tried to redirect");
})

router.post('/verify', (req, res) => {
    var ticket = req.body.ticket;
    if (typeof (ticket) === 'undefined') {
	return;
    }
    cas.validate(ticket, (err, status, netid) => {
	if (err) {
	    console.log(err);
	    res.sendStatus(500);
	    return;
	}
	console.log(status);
	console.log(netid);
/*
	User.findOrCreate({
	    where: {netid: 'netid'}
	}).then();
*/
	res.send({status: status, netid: netid});
    })
})

router.get('/logout', (req, res) => {
    res.redirect(casURL + 'logout?url=https://debugger.herokuapp.com');
})

module.exports.router = router;

