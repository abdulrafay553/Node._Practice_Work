const mongoose = require('mongoose');

const OrderSchema = mongoose.Schema({
    id: { type: Number, },
    image: { type: String, },
    title: { type: String },
    price: { type: Number },
    description: { type: String },
    qty: { type: Number },
    amount: { type: Number },
    username: { type: String },
    orderdate: { type: String },
}, { timestamps: true });

const OrderMasterModel = mongoose.model('ordermaster', OrderSchema);

module.exports = OrderMasterModel;