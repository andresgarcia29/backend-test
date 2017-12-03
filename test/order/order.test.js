const getTotally = require('../../app/helpers/order.helper'),
  mocks = require('./order.mock');

it('Verify the price is correct', () => {
  const result = getTotally(mocks[0]);
  if (result !== 81) {
    throw new Error(`Expected 81, but got ${result}`);
  }
});

it('Verify all the discount', () => {
  const result = getTotally(mocks[1]);
  if (result !== 25) {
    throw new Error(`Expected 25, but got ${result}`);
  }
});