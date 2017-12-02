'use strict';

const models = require('../helpers/model'),
  bcrypt = require('bcryptjs'),
  jwt = require('jsonwebtoken'),
  jwtOptions = require('../../config/jwtOptions');

class Auth{
  signUp(req, res) {
    if (!req.body) return res.status(200).send({message: "Empty data"});
    models.User.create(req.body).then((user) => {
      res.status(200).send({
        message: "User was created correctly",
      });
    }).catch((err) => {
      res.status(500).send({
        message: err,
      });
    });
  }
  signIn(req, res){
    if (!req.body) return res.status(200).send({message: "Empty data"});
    models.User.findOne({
      where: {
        email: req.body.email
      }
    }).then((data) => {
      if (!data) return res.status(200).send({message: "User not found"});
      const user = data.dataValues;
      if (bcrypt.compareSync(req.body.password, user.password)) {
        let payload = { user: user.id }
        let token = jwt.sign(payload, jwtOptions.secretOrKey)
        res.status(200).send({
          token: token,
        });
      } else {
        return res.status(200).send({message: 'The password is incorrect'})
      }
    }).catch(() => {
      res.status(500).send({
        message: "Errror",
      })
    })
  }
}


module.exports = new Auth();