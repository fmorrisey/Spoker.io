"use strict";
const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;
const Schema = mongoose.Schema;

const productSchema = new Schema({
    department:{type: mongoose.Schema.Types.ObjectId, ref: 'Department', default: 'Bike'},                                         // Bike, Accessory, Component, etc
    category: {type: mongoose.Schema.Types.ObjectId, ref: 'Category'},                                              // Road, Endurance, Kids, Tandem, etc
    name: {  // Example Domane AlR3
        type: String,
        required: true,
        trim: true,
        minlength: 3
    },
    brand: {type: String, required: true},                                              // Trek, Specialized, Cervelo, etc.
    description: {type: String, required: false},                                       // Sales Jargon
    msrp: { type: Number, required: [true, 'MSRP cost required'] },                     // msrp ex $2500
    price: { type: Number, required: [true, 'Retail price required'] },                 // retail price ex $2799
    images:
    {
        data: Buffer,
        contentType: String
    }
}, {
    timeStamp: true,
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;