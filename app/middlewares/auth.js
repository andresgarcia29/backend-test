'use strict';

const passport = require('passport');

const isLoggedIn = () => passport.authenticate('jwt', {
  session: false
});

module.exports = isLoggedIn();