"use strict";
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const categorySchema = new Schema({
    category: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: [3, "Longer Name Required"]
    }
    //url: { type: String, required: true}
});

const category = mongoose.model('category', categorySchema);

module.exports = category;