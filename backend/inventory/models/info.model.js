const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var validateEmail = function (email) {
  var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return re.test(email);
};

const infoSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    minlength: [1, "Welcome Header Required"],
  },
  about: {
    type: String,
    required: true,
    trim: true,
    minlength: [1, "About Required"],
  },
  services: {
    type: String,
    required: true,
    trim: true,
    minlength: [1, "Services Description Required"],
  },
  phone: {
    type: String,
    required: true,
    trim: true,
    minlength: [10, "Phone Number Required"],
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
  hours: {
    type: String,
    required: true,
    trim: true,
  },
  street1: {
    type: String,
    required: false,
    trim: true,
    minlength: 3,
  },
  city: {
    type: String,
    required: false,
    trim: true,
    minlength: 3,
    default: "Milwaukee",
  },
  state: {
    type: String,
    required: false,
    trim: true,
    minlength: 2,
  },
  country: {
    type: String,
    required: false,
    trim: true,
    minlength: 2,
    default: "USA",
  },
  zipCode: {
    type: Number,
    required: false,
    trim: true,
    minlength: 5,
  },
});
const Info = mongoose.model("Info", infoSchema);
module.exports = Info;
