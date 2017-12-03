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
}

module.exports = getTotally;