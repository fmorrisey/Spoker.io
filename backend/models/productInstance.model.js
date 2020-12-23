const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const productInstanceSchema = new Schema({
    product: { type: Schema.Types.ObjectId, ref: 'product', required: true},
    status: {type: String, required: true, enum: ['In Stock', 'Back Order', 'Loaned', 'Discontinued'], default: 'On Order'},
    quantity: {type: Number, required: true}
});

//Virtual for the product URl
productInstanceSchema
    .virtual('url')
    .get(function () {
        return '/product/' + this._id;
    });

// Export Model
module.exports = mongoose.model('ProductInstance', productInstanceSchema);

