"use strict";
const router = require('express').Router();
let Brand = require('../models/brand.model');

router.route('/').get((req, res) => {
    Brand.find()
           .then(brands => res.json(brands))
           .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
    const brand = req.body.brand;
        
    const newbrand = new Brand({
        brand,
    });

    newbrand.save()
    .then(() => res.json('Brand added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;
//================================
"use strict";
const router = require('express').Router();
let Brand = require('../models/brand.model');
const { auth } = require('../../auth/middleware/auth');

router.get('/', [auth] ,(req, res) => {


    console.log('User From Brand', req.user);

    // get user id
    Brand.find()
           .then(brands => res.json(brands))
           .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
    const brand = req.body.brand;
        
    const newbrand = new Brand({
        brand,
    });

    newbrand.save()
    .then(() => res.json('Brand added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;