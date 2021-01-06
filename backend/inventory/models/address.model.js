const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const addressSchema = new Schema({
    street1: {
        type: String,
        required: true,
        trim: true,
        minlength: 3
    },
    street2: {
        type: String,
        required: false,
        trim: true,
        minlength: 3
    },
    city: {
        type: String,
        required: true,
        trim: true,
        minlength: 3,
        default: 'Milwaukee'
    },
    state: {
        type: String,
        required: true,
        trim: true,
        minlength: 2
    },
    country: {
        type: String,
        required: true,
        trim: true,
        minlength: 2
    },
    zipCode: {
        type: Number,
        required: true,
        trim: true,
        minlength: 5
    },
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    orders: [{type: mongoose.Schema.Types.ObjectId, ref: 'Order'}],
});

const Address = mongoose.model('Address', addressSchema);
module.exports = Address;