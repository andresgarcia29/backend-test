'use strict';

const express = require('express'),
  cors = require('express'),
  bodyParser = require('body-parser'),
  passport = require('passport'),
  morgan = require('morgan'),
  fs = require('fs');

const app = express();

app
  //config
  .set('port', process.env.PORT || 3000)
  //dependencies
  .use(cors())
  .use(bodyParser.json())
  .use(bodyParser.urlencoded({ extended: false }))
  .use(passport.initialize())
  .use(morgan('dev'))
  //routes 

  .use((req, res, next) => {
    var now = new Date().toString();
    var log = `${now}: ${req.method} ${req.url}`;

    console.log(log);
    fs.appendFile('server.log', log + '\n');
    next();
  })

  .get('/', (req, res) => {
    res.status(200).send({
      hola: false,
    });
  })

  app.listen(app.get('port'), () => {
    console.log(`API running on ${app.get('port')} port`)
  });