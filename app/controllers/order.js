'use strict';

const models = require('../helpers/model'),
  getTotally = require('../helpers/order.helper');

class Order{
  create(req, res) {
    if (!req.body) return res.status(200).send({message: "Empty data"});
    req.body.user = req.user.id;
    req.body.createdAt = new Date(Date.now());
    models.Orders.create(req.body).then((order) => {
      res.send({
        data: order
      });
    }).catch((err) => {
      res.status(500).send({
        message: err,
      });
    });
  }
  viewOne(req, res) {
    if (!req.params._id) return res.status(200).send({ message: "Empty data" });
    models.Orders.findById(req.params._id, {
      include: [
        {
          model: models.User,
          as: 'users',
        },
        {
          model: models.OrderProduct,
          as: 'product_order',
          include: [{
            model: models.Products,
            as: 'product_order'
          }]
        }
      ]
    }).then((order) => {
      if (!order) return res.status(202).send({message: "This order doesn't exist"});
      res.status(200).send({
        data: order
      });
    }).catch((err) => {
      res.status(500).send({
        message: "Error"
      });
    });
  }
  viewUser(req, res) {
    models.User.findAll({
      where: {
        email: req.user.email
      },
      include: [
        {
          model: models.Orders,
          as: 'orders',
          include: [{
            model: models.OrderProduct,
            as: 'product_order',
            include: [{
              model: models.Products,
              as: 'product_order'
            }]
          }]
        },
      ]
    }).then((order) => {
      if (!order) return res.status(404).send({ message: "This order doesn't exist" });
      res.status(200).send({
        data: order
      });
    }).catch((err) => {
      res.status(500).send({
        message: "Error"
      });
    });
  }
  addProduct(req, res) {
    if (!req.params._id || !req.body.product) return res.status(200).send({ message: "Empty data" });
    const order = req.params._id,
      product = req.body.product,
      body = {
        orderId: req.params._id,
        productId: req.body.product
      };
    models.Orders.findById(req.params._id).then((ord) => {
      if (ord.user !== req.user.id) {
        return false;
      }
    }).then((next) => {
      if (!next){
        return res.status(200).send({ message: "You are not the owner for this order" });
      } else {
        models.Products.findById(body.productId).then((product) => {
          if (!product) return res.status(200).send({ message: "This product doesn't exist" });
          models.OrderProduct.create(body).then((data) => {
            res.status(200).send({
              message: `The product has been added`
            });
          }).catch((err) => {
            res.status(500).send({
              message: err,
            });
          });
        }).catch((err) => {
          res.status(500).send({
            message: err,
          });
        }) 
      }
    }).catch((err) => {
      res.status(500).send({
        message: err,
      });
    })
  }
  checkOut(req, res) {
    if (!req.params._id) return res.status(200).send({message: "Empty data"})
    models.Orders.findById(req.params._id, {
      include: [
        {
          model: models.User,
          as: 'users',
        },
        {
          model: models.OrderProduct,
          as: 'product_order',
          include: [{
            model: models.Products,
            as: 'product_order'
          }]
        }
      ]
    }).then((order) => {
      if (!order) return res.status(404).send({ message: "This order doesn't exist" });
      const products = order.product_order;
      let totally = getTotally(products);
      res.status(200).send({
        data: totally
      });
      
    }).catch((err) => {
      res.status(500).send({
        message: "Error"
      });
    });
  }
}

module.exports = new Order();
