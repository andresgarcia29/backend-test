Physical Store!
===================


This API is for a physical store! With unitary test and e2e.

----------


What I Use?
-------------

Backend: NodeJs with Express
Database: PostgresQl with Sequelize
Test: Mocha, Chai and Sinon

To start
-------------

- You need to copy the repository and install the dependencies.
- Install nodemon global.
````
npm install --save nodemon -G
````
- Install sequelize cli.
```
npm install --save sequelize-cli
```
- Configure the file: config/db.json with your personal data for your database.
- When you have already configure db.json with your data, you have to create the database "For do it with sequelize" open your terminal in the folder project.
```
sequelize db:create name_of_database
```
- You have to run the migrates.
```
sequelize db:migrate
```
- Also run the seed for the products.
```
sequelize db:seed:all
```
> This instructions you have to do it again with the test database.

- To change the current database we have yo export a environment variable NODE_ENV with the value "test" for change again you have to change the value for "development".

Run the API
-------------

For run the api in development way you have to change the file nodemon.json with:
```
{
  "env": {
    "NODE_ENV": "development"
  }
}
````
Then type in your terminal:
```
npm run test-watch
```
This script is going to run the test and then run the server. For only run the test or run the server are:
Run the server:
```
nodemon server.js
```
Run the test
```
npm run test
```

Endpoints
-------------

- [POST] /signup - Create the user
- - JSON {email : "", password: ""}
- [POST] /signin - Log in
- - JSON {email : "", password: ""}
- [POST] /order/create - To create the order (Authorization)
- - JSON {}
- [POST] /order/add/:id_order - To add products to the order (Authorization) and be the owner of the order
- - JSON {product: product_id}
- [GET] /order/view/:id_order - View a specific order
- [GET] /order/checkout/:id_order - Get the totally price (Authorization)
- [GET] /order/user - View all the user's orders (Authorization)

Authorization:
The routes that have Authorization you have to be log in with your token.
You have to add in the header: Authorization: bearer token
Example:
```
bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoxLCJpYXQiOjE1MTIyMjc5ODZ9.uhXee4KfbfsCbkMtcek3xZWMZ3JTIIyPLLKQ1GacNJ0
```

In the products table we have by the seed:
id - code
1 - pants
2 - tshir
3 - hat

Test e2e
-------------

- To run the test we have to change in nodemon.json or in the terminal NODE_ENV to "test" and then run:

```
npm run e2e
```

This test is going to try to create a user and then create a order and add products to the order and get the price.