const mongoose = require('mongoose');

const ORDER_STATUS = {
    PROCESSED: [0 , 'PROCESSED'],
    DELIVERED: [1 , 'DELIVERED'],
    SHIPPED: [2 , 'SHIPPED'],
};

const orderSchema = new mongoose.Schema({
    trackingNumber: {type: String},
    orderStatus: {type: Number, default: ORDER_STATUS.PROCESSED[0]},
    orderItems: [{type: mongoose.Schema.Types.ObjectId, ref: 'orderItem'}],
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'user'},
    address: {type: mongoose.Schema.Types.ObjectId, ref: 'address'},
}, {timestamps: true});

orderSchema.virtual('total').get(function () {
    let total = 0;
    for (let i = 0; i < this.orderItems.length; i++)
        total += this.orderItems[i].price;
    return total;
});

orderSchema.methods.getOrderStatusString = function () {
    return ORDER_STATUS[Object.keys(ORDER_STATUS)[this.orderStatus]][1];
};

const Order = mongoose.model('Order', orderSchema);
module.exports = Order;

module.exports = {
    Order, ORDER_STATUS
};