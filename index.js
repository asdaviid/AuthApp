const express = require('express');
const app = express();
const passport = require('passport');

require('dotenv').config();

app.use(passport.initialize());
app.use(passport.session());

app.get('/', (req, res) => {
  res.sendFile('auth.html', {
    root: __dirname
  });
});

app.get('/success', (req, res) => {
  res.send('You have successfully logged in');
});

app.get('/error', (req, res) => {
  res.send('error loggin in');
});

passport.serializeUser(function(user, cb) {
  cb(null, user);
});

passport.deserializeUser(function(user, cb) {
  cb(null, obj);
});

// FACEBOOK auth
const FacebookStrategy = require('passport-facebook').Strategy;
const FACEBOOK_APP_ID = 'your app id';
const FACEBOOK_APP_SECRET = 'your app secret';

passport.use(new FacebookStrategy({
  clientID: FACEBOOK_APP_ID,
  clientSecret: FACEBOOK_APP_SECRET,
  callbackURL: '/auth/facebook/callback'
}, function (accessToken, refreshToken, profile, cb) {
  return cb(null, profile);
}));

app.get('/auth/facebook', passport.authenticate('facebook'));

app.get('/auth/facebook/callback', passport.authenticate('facebook', {
  failureRedirect: '/error'
}), function(req, res) {
  res.redirect('/success');
});

const port = process.env.PORT || 3000;

app.listen(port, () => console.log('App listening on port ' + port));
