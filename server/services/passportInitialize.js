const passport = require('passport');
// const GoogleStrategy = require('passport-google-oauth20');
// var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var GoogleTokenStrategy = require('passport-google-token').Strategy;
const JwtStrategy = require('passport-jwt').Strategy  // 用来做requireAuth Middleware
const ExtractJwt = require('passport-jwt').ExtractJwt // 用来做requireAuth Middleware
let mongoose = require('mongoose');

import User from '../models/user'
import config from '../config';

export default function(){
  // use GoogleTokenStragety
  passport.use(
    new GoogleTokenStrategy({
      // options for strategy
      callbackURL: 'http://localhost:5000/auth-success',
      clientID: config.google.clientID,
      clientSecret: config.google.clientSecret
    }, async (accessToken, refreshToken, profile, done) => {
      const email = profile.emails[0].value;
      // check if user already exists
      const currentUser = await User.findOne({googleId: profile.id});
      if (currentUser) {
        // already have the user -> return (login)
        return done(null, currentUser);
      } else {
        // register user and return
        const newUser = await new User({email: email, googleId: profile.id}).save();
        return done(null, newUser);
      }
    }
  ));
  // use Local JWT requireAuth
  const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromHeader('authorization'),
    secretOrKey: config.secret
  }
  const jwtLogin = new JwtStrategy(jwtOptions, function(payload, done){
    User.findById(payload.sub, function(err, user){
      if(err){
        return done(err, false)
      }
      if(user){
        done(null, user)
      } else {
        done(null, false)
      }
    })
  })
  passport.use(jwtLogin)
}
