const mongoose = require('mongoose');

const addressSchema = new Schema({
    street1: {type: String},
    street2: {type: String},
    city: {type: String},
    status: {type: String},
    country: {type: String},
    zipCode: {type: String},
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    orders: [{type: mongoose.Schema.Types.ObjectId, ref: 'Order'}],
});

const Address = mongoose.model('Address', addressSchema);
module.exports = Address;