const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;

const ORDER_STATUS = {
    PROCESSED: [0 , 'PROCESSED'],
    DELIVERED: [1 , 'DELIVERED'],
    SHIPPED: [2 , 'SHIPPED'],
};

const PICKUP_STATUS = {
    INSTORE: [0 , 'INSTORE'],
    CURBSIDE: [1 , 'CURBSIDE'],
    SHIPPING: [2 , 'SHIPPING'],
};

const orderSchema = new mongoose.Schema({
    trackingNumber: {type: String},
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    prodId: [{type: mongoose.Schema.Types.ObjectId, ref: 'Product'}],
    orderStatus: {type: Number, default: ORDER_STATUS.PROCESSED[0]},
    pickUpStatus: {type: Number, default: PICKUP_STATUS.INSTORE[0]},        
    address: {type: mongoose.Schema.Types.ObjectId, ref: 'Address'},
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

orderSchema.methods.getPickUpString = function () {
    return PICKUP_STATUS[Object.keys(PICKUP_STATUS)[this.pickUpStatus]][1];
};

const Order = mongoose.model('Order', orderSchema);
module.exports = Order;


module.exports = {
    Order, ORDER_STATUS, PICKUP_STATUS
}