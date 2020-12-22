const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const productSchema = new Schema({
    productName: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: 3
    },
    productType: { type: String, required: true}, //Bike, Accessory, etc
    cost: { type: Number, required: true },
    price: { type: Number, required: true }
}, {
    timeStamp: true,
});

const Product = mongoose.model('Product', productSchema);

module.exports = User;