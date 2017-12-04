const order = [[
  {
    "id": 24,
    "orderId": 14,
    "productId": 1,
    "createdAt": "2017-12-02T16:41:54.805Z",
    "updatedAt": "2017-12-02T16:41:54.805Z",
    "product_order": {
      "id": 1,
      "code": "pants",
      "name": "Pants",
      "price": 5,
      "createdAt": "2017-12-02T15:18:18.621Z",
      "updatedAt": "2017-12-02T15:18:18.621Z"
    }
  },
  {
    "id": 23,
    "orderId": 14,
    "productId": 2,
    "createdAt": "2017-12-02T16:41:52.126Z",
    "updatedAt": "2017-12-02T16:41:52.126Z",
    "product_order": {
      "id": 2,
      "code": "tshirt",
      "name": "T-Shirt",
      "price": 20,
      "createdAt": "2017-12-02T15:18:18.621Z",
      "updatedAt": "2017-12-02T15:18:18.621Z"
    }
  },
  {
    "id": 22,
    "orderId": 14,
    "productId": 2,
    "createdAt": "2017-12-02T16:41:51.532Z",
    "updatedAt": "2017-12-02T16:41:51.532Z",
    "product_order": {
      "id": 2,
      "code": "tshirt",
      "name": "T-Shirt",
      "price": 20,
      "createdAt": "2017-12-02T15:18:18.621Z",
      "updatedAt": "2017-12-02T15:18:18.621Z"
    }
  },
  {
    "id": 21,
    "orderId": 14,
    "productId": 2,
    "createdAt": "2017-12-02T16:41:50.848Z",
    "updatedAt": "2017-12-02T16:41:50.848Z",
    "product_order": {
      "id": 2,
      "code": "tshirt",
      "name": "T-Shirt",
      "price": 20,
      "createdAt": "2017-12-02T15:18:18.621Z",
      "updatedAt": "2017-12-02T15:18:18.621Z"
    }
  },
  {
    "id": 20,
    "orderId": 14,
    "productId": 2,
    "createdAt": "2017-12-02T16:41:50.125Z",
    "updatedAt": "2017-12-02T16:41:50.125Z",
    "product_order": {
      "id": 2,
      "code": "tshirt",
      "name": "T-Shirt",
      "price": 20,
      "createdAt": "2017-12-02T15:18:18.621Z",
      "updatedAt": "2017-12-02T15:18:18.621Z"
    }
  }
],
  [
    {
      "id": 26,
      "orderId": 15,
      "productId": 1,
      "createdAt": "2017-12-02T16:42:51.356Z",
      "updatedAt": "2017-12-02T16:42:51.356Z",
      "product_order": {
        "id": 1,
        "code": "pants",
        "name": "Pants",
        "price": 5,
        "createdAt": "2017-12-02T15:18:18.621Z",
        "updatedAt": "2017-12-02T15:18:18.621Z"
      }
    },
    {
      "id": 25,
      "orderId": 15,
      "productId": 1,
      "createdAt": "2017-12-02T16:42:49.944Z",
      "updatedAt": "2017-12-02T16:42:49.944Z",
      "product_order": {
        "id": 1,
        "code": "pants",
        "name": "Pants",
        "price": 5,
        "createdAt": "2017-12-02T15:18:18.621Z",
        "updatedAt": "2017-12-02T15:18:18.621Z"
      }
    },
    {
      "id": 27,
      "orderId": 15,
      "productId": 2,
      "createdAt": "2017-12-02T16:42:53.634Z",
      "updatedAt": "2017-12-02T16:42:53.634Z",
      "product_order": {
        "id": 2,
        "code": "tshirt",
        "name": "T-Shirt",
        "price": 20,
        "createdAt": "2017-12-02T15:18:18.621Z",
        "updatedAt": "2017-12-02T15:18:18.621Z"
      }
    }
  ]
]

const checkOut = (order) => {
  if (!order || order == []) return { message: "This order doesn't exist" };
  return getTotally(order);
};

function getTotally(products) {
  let totally = 0;

  //Products with disscount
  let pants = 0, tshirt = 0, pricePants = 0, priceTshirt = 0;

  products.forEach((product) => {
    if (product.product_order.code === "tshirt") {
      tshirt++;
      priceTshirt = product.product_order.price;
    } else if (product.product_order.code == "pants") {
      pants++;
      pricePants = product.product_order.price;
    } else {
      totally += product.product_order.price;
    }
  })

  if (pants % 2 === 0) {
    totally += parseInt((pants / 2)) * pricePants;
  } else {
    totally += parseInt((pants / 2)) * pricePants + pricePants;
  }

  if (tshirt >= 3) {
    totally += tshirt * 19;
  } else {
    totally += tshirt * priceTshirt;
  }
  return totally;
};

module.exports = {
  order,
  checkOut,
  getTotally
};