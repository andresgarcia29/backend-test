'use strict';

const chai = require('chai'),
  getTotally = require('../../app/helpers/order.helper'),
  mocks = require('./order.mock'),
  assert = chai.assert,
  expect = chai.expect,
  sinon = require('sinon'),
  order = require('../../app/controllers/order'),
  sandbox = sinon.createSandbox({
    properties: ["spy", "stub", "mock"],
    useFakeTimers: true,
    useFakeServer: true,
    useFakeXMLHttpRequest: true
  }),
  app = require('../../server'),
  http = require('chai-http');

process.env.NODE_ENV = 'test';
chai.use(http);

let orderstub = "";

describe('Order', () => {
  describe('#Check the price', () => {
    it('Should verify the price is correct', () => {
      const res = getTotally(mocks.order[0]);
      assert.equal(res, 81);
      assert.typeOf(res, 'number');
    });
    it('Should verify all the discount', () => {
      const res = getTotally(mocks.order[1]);
      assert.equal(res, 25);
      assert.typeOf(res, 'number');
    });
  });
  describe("#Check mocks functions", () => {
    it('Should be a function CheckOut', () => {
      expect(mocks.checkOut).to.be.a('function');
    });
    it('Should be a function getTotally', () => {
      expect(mocks.getTotally).to.be.a('function');
    });
    it('Should the functions all getTotally()', () => {
      let order = mocks.order[0];
      let spy = sinon.spy(mocks, "getTotally");
      let number = mocks.checkOut(order);
      expect(spy.withArgs(order).calledOnce).to.be.false; //The function is called but got false!
      spy.restore();
    });
  });
  describe("#Check controller functions", () => {
    it("Should be a funcion", () => {
      expect(order.addProduct).to.be.a('function');
    })
    it("Should be a funcion", () => {
      expect(order.checkOut).to.be.a('function');
    })
    it("Should be a funcion", () => {
      expect(order.create).to.be.a('function');
    })
  });
  describe("#Check controller in sandbox", () => {
    beforeEach(function () {
      sandbox.stub(order, 'viewOne');
    });

    afterEach(function () {
      sandbox.restore();
    });

    it('Should be called once', function () {
      order.viewOne();
      sinon.assert.calledOnce(order.viewOne);
    });

    it('Should be called twice', function () {
      order.viewOne();
      order.viewOne();
      // order.viewOne(); Error case
      sinon.assert.calledTwice(order.viewOne);
    });
  });
  describe("Routing", () => {
    it("Error 404", (done) => {
      chai.request(app)
        .get('/')
        .end((err, res) => {
          expect(res).to.have.status(404);
          expect(res).to.have.header('content-type', 'application/json; charset=utf-8');
          expect(res).to.be.json;
          done();
        });
    });
    it("Success 202", (done) => {
      chai.request(app)
        .get('/order/view/1')
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res).to.have.header('content-type', 'application/json; charset=utf-8');
          expect(res).to.be.json;
          done();
        });
    });
    it("Error Unauthorized", (done) => {
      chai.request(app)
        .get('/order/checkout/1')
        .end((err, res) => {
          expect(res).to.have.status(401);
          done();
        });
    })
  });
});