"use strict";
const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;
const Schema = mongoose.Schema;

const productSchema = new Schema({
    department:{type: String, required: true},                                         // Bike, Accessory, Component, etc
    category: {type: String, required: true},                                              // Road, Endurance, Kids, Tandem, etc
    productName: {  // Example Domane AlR3
        type: String,
        required: true,
        trim: true,
        minlength: 3
    },
    //Save these for dropdown later
    //manufacturer: [{type: Schema.Types.ObjectId, ref: 'Manufacturer', required: true}],               // Trek, Specialized, Cervelo, etc.
    //productType: [{ type: Schema.Types.ObjectId, ref: 'ProductType', required: true}],  // Bike, Accessory, Component, etc
    //style: [{ type: Schema.Types.ObjectId, ref: 'Style', required: true}],              // Road, Endurance, Kids, Tandem, etc

    brand: {type: String, required: true},                                              // Trek, Specialized, Cervelo, etc.
    description: {type: String, required: false},                                       // Sales Jargon
    msrpCost: { type: Number, required: [true, 'MSRP cost required'] },                 // msrpCost ex $2500
    priceRetail: { type: Number, required: [true, 'Retail price required'] },           // retail price ex $2799
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