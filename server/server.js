import express from 'express';
import session from 'express-session';
import connectRedis from 'connect-redis';
import fs from 'fs';
import path from 'path';
import passport from 'passport';
import cookieParser from 'cookie-parser';
import {OAuth2Strategy as GoogleStrategy} from 'passport-google-oauth';


import config from './config';
import apiRouter from './routes';

const app = express();
const RedisStore = connectRedis(session);
app.use(cookieParser());



if (process.env.NODE_ENV !== 'production') {
  const webpackDevMiddleware = require('webpack-dev-middleware');
  const webpack = require('webpack');

  let compiler = webpack(require('../webpack.config'));

  app.use(webpackDevMiddleware(compiler, {
    noInfo: false,
    publicPath: '/client'
  }));

} else {
  app.use('/client', express.static(path.join(__dirname, '../dist')))
}


app.use(session({
  store: new RedisStore({
    prefix: 'vivace.sess:',
    port: config.redis_port,
    host: config.redis_host
  }),
  secret: process.env.SESSION_SECRET || 'get smarter',
  resave: false,
  saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  done(null, obj);
});

passport.use(new GoogleStrategy({
    clientID: config.oauth2_client_id,
    clientSecret: config.oauth2_client_secret,
    callbackURL: config.oauth2_callback_url
  },
  function(accessToken, refreshToken, profile, done) {
    if(!process.env.RESTRICT_TO_DOMAIN ||
      (profile._json.domain === process.env.RESTRICT_TO_DOMAIN)){
      process.nextTick(function () {
        return done(null, profile);
      });
    } else {
      done(new Error('invalid email domain'));
    }
  }
));

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) { return next(); }
  res.redirect('/auth/google');
}



app.use('/api', require('./routes'));

app.get('/',
  ensureAuthenticated,
  (req, res) => {
    fs.readFile(path.join(__dirname, '../client/index.html'), (err, info) => {
      res.type('html');
      res.end(info);
    });
  }
);


app.get('/auth/google',
    passport.authenticate('google', {
      scope: [
      'https://www.googleapis.com/auth/plus.login',
      'https://www.googleapis.com/auth/userinfo.email'
      ]
    })
);

app.get('/auth/google/callback', 
  passport.authenticate('google', { failureRedirect: '/auth/google' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/');
  }
);

let listener = app.listen(process.env.PORT || 8001, () => {
  console.log('\x1b[33m%s:\x1b[4m%s\x1b[0m', 'App is listening on port', listener.address().port);
});


module.exports = app;
