const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const departmentSchema = new Schema({
  department: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: [3, "Longer Name Required"],
  },
  //url: { type: String, required: true}
});

const Department = mongoose.model("Department", departmentSchema);

module.exports = Department;
