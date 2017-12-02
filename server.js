'use strict';

const express = require('express'),
  cors = require('express'),
  bodyParser = require('body-parser'),
  morgan = require('morgan'),
  fs = require('fs'),
  port = process.env.PORT || 3000,
  passport = require('passport'),
  strategy = require('./config/passport'),
  auth = require('./app/routes/auth'),
  models = require('./db/models');

passport.use(strategy);

const app = express();

app
  //config
  .set('port', port)
  //dependencies
  .use(cors())
  .use(bodyParser.json())
  .use(bodyParser.urlencoded({ extended: false }))
  .use(passport.initialize())
  .use(morgan('dev'))
  //logs 
  .use((req, res, next) => {
    var now = new Date().toString();
    var log = `${now}: ${req.method} ${req.url}`;

    console.log(log);
    fs.appendFile('server.log', log + '\n');
    next();
  })
  //routes
  .use(auth);

models.sequelize.sync().then(() => {
  app.listen(app.get('port'), () => {
    console.log(`API running on ${app.get('port')} port`)
  });
});