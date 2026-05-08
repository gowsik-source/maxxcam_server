const productCategoryController = require('../controllers/productCategoryController');
const productCategoryModel = require('../models/productCategoryModel');
const productCategoryDal = new Object();

// add product category

productCategoryDal.addProductCategory = async (productCategory) => {
    try {
        let payLoad = new productCategoryModel(productCategory);
        let result = await payLoad.save();
        if (result) {
            return { status: true, message: "Product category added successfully", data: result };
        }
        return { status: false, message: "Failed to add product category", data: {} };
    } catch (error) {
        return { status: false, message: error ? error.message : "server error", data: {} };
    }
}

// prevent duplicate product category

productCategoryDal.productCategoryExists = async (categoryNameFromBody) => {
    try {
        let lowerCaseCategoryNameFromBody = categoryNameFromBody.trim().toLowerCase();
        let existingProductCategory = await productCategoryModel.findOne(
            {
                lowerCasedCategoryName : lowerCaseCategoryNameFromBody,
                deleted: false
            }
        );
        if (existingProductCategory) {
            return { status: true, message: "Product category already exists", data: existingProductCategory };
        }
        return {status: false, message: "Product category does not exist", data: {} };
    } catch (error) {
        return {status: false, message: error ? error.message : "server error", data: {} };
    }
}

module.exports = productCategoryDal;