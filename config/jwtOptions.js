'use strict';

const passportJWT = require("passport-jwt"),
  ExtractJwt = passportJWT.ExtractJwt;

let jwtOptions = {}
jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
jwtOptions.secretOrKey = '3d8djd8dd8xdDD#DKDO#Kd';

module.exports = jwtOptions;