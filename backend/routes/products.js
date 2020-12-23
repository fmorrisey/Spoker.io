const router = require('express').Router();
let Product = require('../models/product.model');

router.route('/').get((req, res) => {
    Product.find()
           .then(product => res.json(products))
           .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
    const productName = req.body.productName;
    const brand = Enum(req.body.brand);
    const 
    
    
    
    const newProduct = new Product({
        productName,
        brand,
        productType,

        msrpCost,
        priceRetail,

    });

    newProduct.save()
    .then(() => res.json('Product added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;