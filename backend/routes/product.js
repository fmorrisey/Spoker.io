"use strict";
const router = require('express').Router();
let Product = require('../models/product.model');

router.route('/').get((req, res) => {
    Product.find()
           .then(product => res.json(product))
           .catch(err => res.status(400).json('Error: ' + err));
});

//============CRUDs==============
router.route('/add').post((req, res) => {
    const productName = req.body.productName;
    const manufacturer = req.body.manufacturer;
    const productType = req.body.productType;
    const style = req.body.style;
    const description = req.body.description;
    const msrpCost = Number(req.body.msrpCost);
    const priceRetail = Number(req.body.priceRetail);
    const img = req.body.img;
    
    const newProduct = new Product({
        productName,
        manufacturer,
        productType,
        style,
        description,
        msrpCost,
        priceRetail,
        img,
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
            product.productName = req.body.productName;
            product.manufacturer = req.body.manufacturer;
            product.productType = req.body.productType;
            product.style = req.body.style;
            product.description = req.body.description;
            product.msrpCost = Number(req.body.msrpCost);
            product.priceRetail = Number(req.body.priceRetail);
            product.img = req.body.img;

            product.save()
            .then(() => res.json(product.productName + ' Updated!'))
            .catch(err => res.status(400).json('Error: ' + err));
           })

});

module.exports = router;