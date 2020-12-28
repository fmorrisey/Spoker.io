"use strict";
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const brandSchema = new Schema({
    brand_name: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: [3, "Longer Name Required"]
    }
    //url: { type: String, required: true}
});

const brand = mongoose.model('brand', brandSchema);

module.exports = brand;