"use strict";
const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;
const Schema = mongoose.Schema;

const productSchema = new Schema({
    department:{type: String, required: true, default: "Bike"},                                         // Bike, Accessory, Component, etc
    category: {type: String, required: true},                                              // Road, Endurance, Kids, Tandem, etc
    productName: {  // Example Domane AlR3
        type: String,
        required: true,
        trim: true,
        minlength: 3
    },
    brand: {type: String, required: true},                                              // Trek, Specialized, Cervelo, etc.
    description: {type: String, required: false},                                       // Sales Jargon
    msrpCost: { type: Number, required: [true, 'MSRP cost required'] },                 // msrpCost ex $2500
    priceRetail: { type: Number, required: [true, 'Retail price required'] },           // retail price ex $2799
    //size: { type: Number, required: true},
    //color: { type: String, required: true},
    img:
    {
        data: Buffer,
        contentType: String
    }
}, {
    timeStamp: true,
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;