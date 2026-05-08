const express = require('express');
const productRoute = express.Router();
const productController = require('../controllers/productController');

// create product

productRoute.post('/add-product', async (req, res) => {
    let result = await productController.addProduct(req);
    res.status(result.code).send(result);
});

// display all products

productRoute.get('/all-products', async (req, res) => {
    let result = await productController.allProducts(req);
    res.status(result.code).send(result);
});

// display lenses & accesories products only

productRoute.get('/lenses-and-accessories', async (req, res) => {
    let result = await productController.lensesAndAccessories(req);
    res.status(result.code).send(result);
});

// display single product details

productRoute.get('/:id', async (req, res) => {
    let result = await productController.getSingleProductDetails(req);
    res.status(result.code).send(result);
});

module.exports = productRoute;