"use strict";
const router = require('express').Router();
let category = require('../models/category.model');

router.route('/').get((req, res) => {
    category.find()
           .then(categories => res.json(categories))
           .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
    const category = req.body.category;
        
    const newcategory = new category({
        category,
    });

    newcategory.save()
    .then(() => res.json('category added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;