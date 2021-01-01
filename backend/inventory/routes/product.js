"use strict";
const router = require('express').Router();
let Product = require('../models/product.model');
let Brand = require('../models/brand.model');

router.route('/').get((req, res) => {
    Product.find()
           .then(product => res.json(product))
           .catch(err => res.status(400).json('Error: ' + err));
});

//============CRUDs==============
router.route('/add').post((req, res) => {
    const department = req.body.department;
    const category = req.body.category;
    const name = req.body.name;
    const brand = req.body.brand;
    const description = req.body.description;
    const msrp = Number(req.body.msrp);
    const price = Number(req.body.price);
    const images = req.body.images;
    
    const newProduct = new Product({
        department,
        category,
        name,
        brand,
        description,
        msrp,
        price,
        images,
    });

    newProduct.save()
    .then(() => res.json('Product added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

//============GET BY ID======
router.route('/:id').get((req, res) => {
    Product.findById(req.params.id)
           .then(product => res.json(product))
           .catch(err => res.status(400).json('Error: ' + err));
});

//============DELETE======
router.route('/:id').delete((req, res) => {
    Product.findByIdAndDelete(req.params.id)
           .then(() => res.json('Product Deleted'))
           .catch(err => res.status(400).json('Error: ' + err));
});

//============UPDATE======
router.route('/update/:id').post((req, res) => {
    Product.findById(req.params.id)
           .then(product => {
            product.department = req.body.department;
            product.category = req.body.category;
            product.name = req.body.name;
            product.brand = req.body.brand;
            product.description = req.body.description;
            product.msrp = Number(req.body.msrp);
            product.price = Number(req.body.price);
            product.images = req.body.images;

            product.save()
            .then(() => res.json(product.name + ' Updated!'))
            .catch(err => res.status(400).json('Error: ' + err));
           })

});

module.exports = router;