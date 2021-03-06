const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const categorySchema = new Schema({
  category: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: [3, "Longer Name Required"],
  },
  //url: { type: String, required: true}
});

const Category = mongoose.model("Category", categorySchema);

module.exports = Category;
