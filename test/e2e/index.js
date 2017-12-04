let token = "";
let head_config = { 'Content-Type': 'application/json'}
const axios = require('axios');
let config = {
  baseURL: 'http://localhost:3000',
  headers: head_config
};
let http = axios.default.create(config);
const mocks = require('./mocks');
let needs = {}

let Process = () => {
  let user = mocks.user;
  http.post('/signup', (user)).then((response) => {
    if (response.data.message === "User was created correctly") {
      console.log(response.data.message);
      http.post('/signin', user).then((login) => {
        console.log(login.data.token);
        needs.token = login.data.token;
        token = login.data.token;
        if (token != "") {
          head_config['Authorization'] = 'bearer ' + token;
          http = axios.default.create(config);
          http.post('/order/create', {}).then((order) => {
            console.log("Order created");
            needs.user = order.data.data.user;
            needs.order = order.data.data.id;
            http.post('/order/add/' + needs.order, {product: 1}).then((message) => {
              if (message.data.message === "The product has been added") {
                console.log("Pants ADD")
                http.post('/order/add/' + needs.order, { product: 2 }).then((message) => {
                  if (message.data.message === "The product has been added") {
                    console.log("Tshirt ADD")
                    http.post('/order/add/' + needs.order, { product: 3 }).then((message) => {
                      if (message.data.message === "The product has been added") {
                        console.log("Hat ADD")
                        http.get('/order/checkout/' + needs.order).then((price) => {
                          if (price.data.data === 32.5) {
                            console.log("The totall to pay is" + price.data.data);
                            console.log("Test finish correctly");
                          } else {
                            throw new Error("Error to checkout");
                          }
                        }).catch((err) => {
                          throw err;
                        })
                      } else {
                        throw new Error("Product doesn't add");
                      }
                    }).catch((err) => {
                      throw err;
                    })
                  } else {
                    throw new Error("Product doesn't add");
                  }
                }).catch((err) => {
                  throw err;
                })
              } else {
                throw new Error("Product doesn't add");
              }
            }).catch((err) => {
              throw err;
            })
          }).catch((err) => {
            throw err;
          })
        } else {
          throw new Error("Error to get the token");
        }
      }).catch((err) => {
        throw err;
      })
    } else {
      throw new Error("Error to create user");
    }
  }).catch((err) => {
    throw err;
  })
}

module.exports = Process;