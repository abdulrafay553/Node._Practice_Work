const mongoose = require('mongoose');

const ProductSchema = mongoose.Schema({
    productname: { type: String, required: true },
    productprice: { type: Number, required: true },
    productimage: { type: String },
}, { timestamps: true });

const ProductMasterModel = mongoose.model('productmaster', ProductSchema);

module.exports = ProductMasterModel;