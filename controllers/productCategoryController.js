const productCategoryModel = require('../models/productCategoryModel');
const productCategoryDal = require('../dal/productCategoryDal');
const productCategoryController = new Object();

// add product category

productCategoryController.addProductCategory = async (req, res) => {
    try {
        let body = req?.body;
        if (!body?.categoryName) {
            return { code: 400, message: "Category is required", data: {} };
        }
        let existingCategory = await productCategoryDal.productCategoryExists(body?.categoryName);
        if (existingCategory.status) {
            return { code: 400, message: existingCategory.message, data: existingCategory.data };
        }
        body['lowerCasedCategoryName'] = body?.categoryName?.trim().toLowerCase();
        let result = await productCategoryDal.addProductCategory(body);
        if (result.status) {
            return { code: 200, message: result.message, data: result.data };
        }
        return { code: 400, message: result.message, data: {} };
    } catch (error) {
        return { code: 500, message: error ? error.message : "server error", data: {} };
    }
}

module.exports = productCategoryController;