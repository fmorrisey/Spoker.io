"use strict";
const router = require('express').Router();
let Product = require('../models/product.model');

router.route('/').get((req, res) => {
    Product.find()
           .then(products => res.json(products))
           .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
    const productName = req.body.productName;
    const brand = req.body.brand;
    const productType = req.body.productType;
    const style = req.body.style;
    const description = req.body.description;
    const msrpCost = Number(req.body.msrpCost);
    const priceRetail = Number(req.body.priceRetail);
    const img = req.body.img;
    
    const newProduct = new Product({
        productName,
        brand,
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

module.exports = router;