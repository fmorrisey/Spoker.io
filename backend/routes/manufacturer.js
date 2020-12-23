"use strict";
const router = require('express').Router();
let manufacturer = require('../models/manufacturer.model');

router.route('/').get((req, res) => {
    manufacturer.find()
           .then(manufacturers => res.json(manufacturers))
           .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
    const manufacturerName = req.body.manufacturerName;
        
    const newmanufacturer = new manufacturer({
        manufacturerName,
    });

    newmanufacturer.save()
    .then(() => res.json('manufacturer added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;