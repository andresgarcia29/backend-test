'use strict';

const express = require('express'),
  routes = express.Router(),
  Auth = require('../controllers/auth'),
  authenticate = require('../middlewares/auth');


routes

  .post('/signup', Auth.signUp)
  .post('/signin', Auth.signIn)
  .get('/', authenticate, (req, res) => {
    res.send({
      message: "Good"
    })
  });

module.exports = routes;