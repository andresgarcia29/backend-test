const faker = require('faker');

let user = {
  "email": faker.internet.email(),
  "password": faker.internet.password()
};

module.exports = {
  user
};