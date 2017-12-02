'use strict';
module.exports = (sequelize, DataTypes) => {
  var Orders = sequelize.define('Orders', {
    user: {
      type: DataTypes.INTEGER,
      allowNull: false,
      foreignKey: true,
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false
    },
    totally: {
      type: DataTypes.DOUBLE,
      allowNull: false,
      defaultValue: 0
    },
    payed: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    }
  }, {});
  Orders.associate = (models) => {
    Orders.belongsTo(models.User, { as: 'users', foreignKey: 'user' });
    Orders.hasMany(models.OrderProduct, { as: 'product_order', foreignKey: 'orderId' });
  };
  return Orders;
};