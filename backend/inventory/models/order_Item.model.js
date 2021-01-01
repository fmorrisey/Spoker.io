const mongoose = require('mongoose');

const orderItemSchema = new Schema({
    name: {type: String, required: true},
    price: {type: String, required: true},
    quantity: {type: Number, required: true},
    order: {type: mongoose.Object.Types.ObjectId, ref: "Order"},
    user: {type: mongoose.Object.Types.ObjectId, ref: "User"},
}, {timestamps: true});

const OrderItem = mongoose.model('OrderItem', orderItemSchema);
module.exports = OrderItem;