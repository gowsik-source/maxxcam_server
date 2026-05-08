const mongoose = require('mongoose');
const { Schema } = require('mongoose');

const productCategorySchema = new Schema({
    categoryName : { type: String, default: '' },
    lowerCasedCategoryName : { type: String, default: '' },
    deleted : { type: Boolean, default: false },
}, { timestamps: true });

const ProductCategoryModel = new mongoose.model('productCategory', productCategorySchema);
module.exports = ProductCategoryModel;