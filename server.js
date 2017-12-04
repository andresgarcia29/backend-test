'use strict';

const express = require('express'),
  cors = require('express'),
  bodyParser = require('body-parser'),
  morgan = require('morgan'),
  fs = require('fs'),
  port = process.env.PORT || 3000,
  passport = require('passport'),
  strategy = require('./config/passport'),
  models = require('./db/models'),
  auth = require('./app/routes/auth'),
  order = require('./app/routes/order'),
  e2e = require('./test/e2e/index');

passport.use(strategy);

const app = express();
process.env.NODE_ENV = 'development'; //Change the database for testing "test || development"

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'))
}

app
  //config
  .set('port', port)
  //dependencies
  .use(cors())
  .use(bodyParser.json())
  .use(bodyParser.urlencoded({ extended: false }))
  .use(passport.initialize())
  //logs 
  .use((req, res, next) => {
    var now = new Date().toString();
    var log = `${now}: ${req.method} ${req.url}`;

    console.log(log);
    fs.appendFile('server.log', log + '\n');
    next();
  })
  //routes
  .use(auth)
  .use('/order', order)
  .all('*', (req, res)  => {
    res.status(404).send({
      message: "Errror 404"
    });
  });

models.sequelize.sync().then(() => {
  app.listen(app.get('port'), () => {
    console.log(`API running on ${app.get('port')} port`)
    if (process.argv.includes("e2e")) {
      e2e();
    };
  });
});

module.exports = app;