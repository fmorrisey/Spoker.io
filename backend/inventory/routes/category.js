"use strict";
const router = require("express").Router();
let Category = require("../models/category.model");

router.route("/").get((req, res) => {
  Category.find()
    .then((categories) => res.json(categories))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/add").post((req, res) => {
  const category = req.body.category;

  const newcategory = new Category({
    category,
  });

  newcategory
    .save()
    .then(() => res.json("category added!"))
    .catch((err) => res.status(400).json("Error: " + err));
});

module.exports = router;
