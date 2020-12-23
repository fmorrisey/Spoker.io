const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const productSchema = new Schema({
    productName: {  // Example Domane AlR3
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: 3
    },
    brand: [{type: Schema.Types.ObjectId, ref: 'Brand', required: true}],               // Trek, Specialized, Cervelo, etc.
    productType: [{ type: Schema.Types.ObjectId, ref: 'ProductType', required: true}],  // Bike, Accessory, Component, etc
    style: [{ type: Schema.Types.ObjectId, ref: 'Style', required: true}],              // Road, Endurance, Kids, Tandem, etc
    description: {type: String, required: false},                                       // Sales Jargon
    msrpCost: { type: Number, required: [true, 'MSRP cost required'] },                 // msrpCost ex $2500
    priceRetail: { type: Number, required: [true, 'Retail price required'] },           // retail price ex $2799
                                         // ex 189-891hj134jkl-8013
    img:
    {
        data: Buffer,
        contentType: String
    }
}, {
    timeStamp: true,
});

const Product = mongoose.model('Product', productSchema);

module.exports = User;