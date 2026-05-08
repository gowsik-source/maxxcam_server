const mongoose = require('mongoose');
const { Schema } = require('mongoose');

const productSchema = new Schema({
    categoryId : { type: mongoose.Schema.Types.ObjectId, ref: 'productCategory' },
    productName : { type: String, default: '' },
    price : { type: Number, default: 0 },
    images : { type: Array, default: [] },
    description : { type: String, default: '' },
    shortDescription : { type: String, default: '' },
    stock : { type: Number, default: 0 },
    productCode : { type: String, default: '', unique: true },
    status : { type: Boolean, default: false },
    deleted : { type: Boolean, default: false },
}, { timestamps: true });

const ProductModel = new mongoose.model('Product', productSchema);

module.exports = ProductModel;