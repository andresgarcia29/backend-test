'use strict';
module.exports = (sequelize, DataTypes) => {
  var OrderProduct = sequelize.define('OrderProduct', {
    orderId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    productId: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {});
  OrderProduct.associate = (models) => {
    OrderProduct.belongsTo(models.Orders, { as: 'order_product', foreignKey: 'orderId' });
    OrderProduct.belongsTo(models.Products, { as: 'product_order', foreignKey: 'productId' });
  };
  return OrderProduct;
};