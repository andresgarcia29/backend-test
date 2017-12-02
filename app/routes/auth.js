'use strict';

const express = require('express'),
  routes = express.Router(),
  Auth = require('../controllers/auth'),
  authenticate = require('../middlewares/auth');


routes

  .post('/signup', Auth.signUp)
  .post('/signin', Auth.signIn);

module.exports = routes;