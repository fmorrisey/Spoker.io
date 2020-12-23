"use strict";
const router = require('express').Router();
let Brand = require('../models/brand.model');

router.route('/').get((req, res) => {
    Brand.find()
           .then(brands => res.json(brands))
           .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
    const brandName = req.body.brandName;
        
    const newBrand = new Brand({
        brandName,
    });

    newBrand.save()
    .then(() => res.json('Brand added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;