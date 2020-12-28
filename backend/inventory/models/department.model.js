"use strict";
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const departmentSchema = new Schema({
    department: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: [3, "Longer Name Required"]
    }
    //url: { type: String, required: true}
});

const department = mongoose.model('department', departmentSchema);

module.exports = department;