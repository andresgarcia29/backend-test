'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Products', [{
      code: 'pants',
      name: 'Pants',
      price: 5,
      createdAt: new Date(Date.now()),
      updatedAt: new Date(Date.now()),
    },
    {
      code: 'tshirt',
      name: 'T-Shirt',
      price: 20,
      createdAt: new Date(Date.now()),
      updatedAt: new Date(Date.now()),
    },
    {
      code: 'hat',
      name: 'hat',
      price: 7.5,
      createdAt: new Date(Date.now()),
      updatedAt: new Date(Date.now()),
    }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Products');
  }
};
