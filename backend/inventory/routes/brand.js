"use strict";
const router = require('express').Router();
let brand = require('../models/brand.model');

router.route('/').get((req, res) => {
    brand.find()
           .then(brands => res.json(brands))
           .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
    const brand = req.body.brand;
        
    const newbrand = new brand({
        brand,
    });

    newbrand.save()
    .then(() => res.json('brand added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;