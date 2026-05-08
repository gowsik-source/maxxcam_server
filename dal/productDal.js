const productModel = require('../models/productModel');
const productDal = new Object();

// add product

productDal.addProduct = async (productData) => {
    try {
        let payLoad = new productModel(productData);
        let product = await payLoad.save();
        if (product) {
            return { status: true, message: "Product added successfully", data: product };
        }
        return { status: false, message: "Failed to add product", data: {} };
    } catch (error) {
        return { status: false, message: error ? error.message : "server error", data: {} };
    }
}

// prevent duplicate product

productDal.productExists = async (productCodeFromBody, productNameFromBody) => {
    try {
        let existingProduct = await productModel.findOne(
            {
                $or:[
                    {productCode: productCodeFromBody},
                    {productName: productNameFromBody},
                ],
                deleted: false
            }
        );
        if (existingProduct) {
            return { status: true, message: "Product already exists", data: existingProduct };
        }
        return { status: false, message: "Product does not exist", data: {} };
    } catch (error) {
        return { status: false, message: error ? error.message : "server error", data: {} };
    }
}

// prevent duplicate product category

productDal.productCategoryExists = async (categoryIdFromBody) => {
    try {
        let existingProductCategory = await productModel.findOne(
            {
                _id: categoryIdFromBody,
                deleted: false
            });
        if (existingProductCategory) {
            return { status: true, message: "Product category already exists", data: existingProductCategory };
        }
        return { status: false, message: "Product category does not exist", data: {} };
    } catch (error) {
        return { status: false, message: error ? error.message : "server error", data: {} };
    }
}

module.exports = productDal;