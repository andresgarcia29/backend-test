'use strict';

const express = require('express'),
  routes = express.Router(),
  Order = require('../controllers/order'),
  authenticate = require('../middlewares/auth');


routes

  .get('/view/:_id', authenticate, Order.viewOne)
  .get('/user', authenticate, Order.viewUser)
  .get('/checkout/:_id', authenticate, Order.checkOut)

  .post('/create', authenticate, Order.create)
  .post('/add/:_id', authenticate, Order.addProduct);

module.exports = routes;