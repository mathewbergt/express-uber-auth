var express = require('express');
var router = express.Router();
var passport = require('passport');
var uberStrategy = require('passport-uber');
var User = require('../models/user');

/* GET home page. */
router.get('/', function(req, res, next) {
	res.render('index', { title: 'Express' });
});

router.post('/auth/init', function (req, res, next) {
	
	passport.use(new uberStrategy({
			clientID: req.body.client_id,
			clientSecret: 'TrYjG6u07PKGKQt5Y4mM5qjPOee07fj4J9MBS3lb', // client secret kept server side only
			callbackURL: "https://localhost:8080/auth/callback"
		},
		function(accessToken, refreshToken, profile, done) {
			User.findOrCreate(profile, function (err, user) {
				return done(err, user);
			});
		}
	));

	res.send({ result: 'success' });
});

router.get('/auth/doauth', passport.authenticate('uber'));

router.get('/auth/callback', 
  passport.authenticate('uber', { failureRedirect: '/?errMsg=Authentication Error' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('https://localhost:9000');
});

module.exports = router;
