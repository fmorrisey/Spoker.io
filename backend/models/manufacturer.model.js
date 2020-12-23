"use strict";
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const manufacturerSchema = new Schema({
    manufacturerName: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: [3, "Longer Name Required"]
    }
    //url: { type: String, required: true}
});

const manufacturer = mongoose.model('manufacturer', manufacturerSchema);

module.exports = manufacturer;