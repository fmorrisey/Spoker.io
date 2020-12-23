const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const brandSchema = new Schema({
    brandName: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: [3, "Longer Name Required"]
    },
    url: { type: String, required: true}
}, {
    timeStamp: true,
});

const Product = mongoose.model('Product', productSchema);

module.exports = User;