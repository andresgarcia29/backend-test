'use strict';

const passport = require('passport'),
  passportJwt = require('passport-jwt'),
  ExtractJwt = passportJwt.ExtractJwt,
  JwtStrategy = passportJwt.Strategy,
  jwtOptions = require('../config/jwtOptions'),
  models = require('../db/models/index');

let strategy = new JwtStrategy(jwtOptions, function (jwt_payload, next) {
  models.User.findById(jwt_payload.user).then((user) => {
    console.log(user);
    next(null, user)
  }).catch((err) => {
    return (err, false);
  })
});

module.exports = strategy
