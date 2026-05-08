const express = require('express');
const productCategoryRoute = express.Router();
const productCategoryController = require('../controllers/productCategoryController');

// add product category
productCategoryRoute.post('/add-product-category', async (req, res) => {
    let result = await productCategoryController.addProductCategory(req);
    res.status(result.code).send(result);
});

module.exports = productCategoryRoute;