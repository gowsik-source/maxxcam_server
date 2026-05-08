const productController = new Object();
const productDal = require('../dal/productDal');
const productModel = require('../models/productModel');
const productCategoryModel = require('../models/productCategoryModel');
const ProductModel = require('../models/productModel');

// create product

productController.addProduct = async (req, res) => {
    try {
        // if body is empty
        let body = req?.body;
        if (!body?.productName) {
            return { code: 400, message: "Product name is required", data: {} };
        }
        if (!body?.price) {
            return { code: 400, message: "Price is required", data: {} };
        }
        if (!body?.images.length) {
            return { code: 400, message: "At least one image is required", data: {} };
        }

        // generate product code
        let productCodePrefix = body?.productName?.substring(0, 3)?.toUpperCase();
        let productCounts = await productModel.countDocuments();
        let productCodeGenerator = productCodePrefix + "-" + (productCounts + 1).toString().padStart(3, "0");
        let existingProduct = await productDal.productExists(productCodeGenerator, body?.productName);
        body['productCode'] = productCodeGenerator;
        if (existingProduct.status) {
            return { code: 400, message: existingProduct.message, data: existingProduct.data };
        }

        // chexk existing product category
        let existingProductCategory = await productDal.productCategoryExists(body?.categoryId);
        if (existingProductCategory.status) {
            return { code: 400, message: existingProductCategory.message, data: existingProductCategory.data };
        }

        // add product
        let result = await productDal.addProduct(body);
        if (result.status) {
            return { code: 200, message: result.message, data: result.data };
        }
        return { code: 400, message: result.message, data: {} };
    } catch (error) {
        return { code: 500, message: error ? error.message : "server error", data: {} };
    }
}

// display all products

productController.allProducts = async (req, res) => {
    try {
        let fetchAllProducts = await productModel.find({ deleted: false });
        if (fetchAllProducts.length) {
            return { code: 200, message: "All products retrieved successfully", data: fetchAllProducts };
        }
        return { code: 404, message: "No products found", data: [] };
    } catch (error) {
        return { code: 500, message: error ? error.message : "server error", data: {} };
    }
}

// display lenses & accesories category only

productController.lensesAndAccessories = async (req, res) => {
    try {
        let productCategory = await productCategoryModel.findOne({
            lowerCasedCategoryName: "lenses & accessories",
            deleted: false
        });
        let categoryProducts = await productModel.find({
            categoryId: productCategory?._id,
            deleted: false
        });
        // console.log(categoryProducts, "categoryProducts (array)");
        if (categoryProducts.length) {
            return { code: 200, message: "Lenses & Accessories products retrieved successfully", data: categoryProducts };
        }
        return { code: 404, message: "No products found in Lenses & Accessories category", data: [] };
    } catch (error) {
        return { code: 500, message: error ? error.message : "server error", data: {} };
    }
}

// display single product details

productController.getSingleProductDetails = async (req) => {
    try {
        let productId = req?.params?.id;
        let findProduct = await productModel.findOne({ _id: productId, deleted: false });
        if (findProduct) {
            return { code: 200, message: "Product details retrieved successfully", data: findProduct };
        }
        return { code: 404, message: "Product not found", data: {} };
    } catch (error) {
        return { code: 500, message: error ? error.message : "server error", data: {} };
    }
}

module.exports = productController;