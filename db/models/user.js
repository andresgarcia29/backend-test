'use strict';

const bcrypt = require('bcryptjs');

module.exports = (sequelize, DataTypes) => {
  var User = sequelize.define('User', {
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  }, {
    hooks: {
      beforeCreate: (user, options) => {
        let salt = bcrypt.genSaltSync(10);
        let hash = bcrypt.hashSync(user.password, salt);
        user.password = hash;
      },
    },
  });
  User.associate = (models) => {
    User.hasMany(models.Orders, { as: 'orders', foreignKey: 'user'});
  };
  return User;
};
