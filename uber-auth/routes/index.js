var express = require('express');
var router = express.Router();
var passport = require('passport');
var OAuth2Strategy = require('passport-oauth2');
var User = require('../models/user');

/* GET home page. */
router.get('/', function(req, res, next) {
	res.render('index', { title: 'Express' });
});

router.post('/auth/init', function (req, res, next) {

	passport.use(new OAuth2Strategy({
			authorizationURL: 'https://login.uber.com/oauth/authorize',
	    tokenURL: 'https://login.uber.com/oauth/token',
	    clientID: req.body.client_id,
	    clientSecret: 'TrYjG6u07PKGKQt5Y4mM5qjPOee07fj4J9MBS3lb', // client secret kept server side only
	    callbackURL: 'https://localhost:8080/auth/callback'
		},
		function(accessToken, refreshToken, profile, done) {
			User.findOrCreate(profile, function (err, user) {
				passport.session.accessToken = accessToken;
				passport.session.refreshToken = refreshToken;
				return done(err, user);
			});
		}
	));

	res.send({ result: 'success' });
});

router.get('/auth/doauth', passport.authenticate('oauth2'));

router.get('/auth/callback', 
  passport.authenticate('oauth2', { failureRedirect: '/?errMsg=Authentication Error' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('https://localhost:9000/#/access_token/' + passport.session.accessToken);
});

module.exports = router;
