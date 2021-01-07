"use strict";
const router = require('express').Router();
let Info = require('../models/info.model');


router.route('/').get((req, res) => {
    Info.find()
           .then(info => res.json(info))
           .catch(err => res.status(400).json('Error: ' + err));
});

//============CRUDs==============
router.route('/add').post((req, res) => {
    const about = req.body.about;
    const services = req.body.services;
    const phone = req.body.phone;
    const email = req.body.email;
    const hours = req.body.hours;
    const street1 = req.body.street1;
    const city = req.body.city;
    const state = req.body.state;
    const country = req.body.country;
    const zipCode = req.body.zipCode;
    
    const newInfo = new Info({
        about,
        services,
        phone,
        email,
        hours,
        street1,
        city,
        state,
        country,
        zipCode,
    });

    newInfo.save()
    .then(() => res.json('Info added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

//============GET BY ID======
router.route('/:id').get((req, res) => {
    Info.findById(req.params.id)
           .then(info => res.json(info))
           .catch(err => res.status(400).json('Error: ' + err));
});

//============DELETE======
router.route('/:id').delete((req, res) => {
    Info.findByIdAndDelete(req.params.id)
           .then(() => res.json('Info Deleted'))
           .catch(err => res.status(400).json('Error: ' + err));
});

//============UPDATE======
router.route('/update/:id').post((req, res) => {
    Info.findById(req.params.id)
           .then(info => {
            info.about = req.body.about;
            info.services = req.body.services;
            info.phone = req.body.phone;
            info.email = req.body.email;
            info.hours = req.body.hours;
            info.street1 = Number(req.body.street1);
            info.city = Number(req.body.city);
            info.state = req.body.state;
            info.country = req.body.country;
            info.zipCode = req.body.zipCode;

            info.save()
            .then(() => res.json(info.phone + ' Updated!'))
            .catch(err => res.status(400).json('Error: ' + err));
           })

});

module.exports = router;