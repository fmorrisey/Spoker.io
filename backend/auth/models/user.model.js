"use strict";
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var validateEmail = function (email) {
    var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email);
};

const userSchema = new Schema({
    first_name: {
        type: String,
        required: true,
        unique: false,
        trim: true,
        minlength: [2, "Longer First Name Required"],
    },
    last_name: {
        type: String,
        required: true,
        unique: false,
        trim: true,
        minlength: [2, "Longer Last Name Required"],
    },
    email: {
        type: String,
        trim: true,
        lowercase: true,
        unique: true,
        required: "Email address is required",
        validate: [validateEmail, "Please fill a valid email address"],
        match: [
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
            "Please fill a valid email address",
        ],
    },
    username: {
        type: String,
        required: true,
        unique: false,
        trim: true,
        minlength: [2, "Username Required"],
    },
    password: {
        type: String,
        required: true,
        unique: false,
        trim: true,
    },
    role: {
        type: String,
        required: true,
    },
    address: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "Address" ,
    },
    //resetPasswordToken: {type: String},
    //resetPasswordExpires: {type: Date},
});

const user = mongoose.model("user", userSchema);

module.exports = user;
