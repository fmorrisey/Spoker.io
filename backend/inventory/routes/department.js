"use strict";
const router = require('express').Router();
let department = require('../models/department.model');

router.route('/').get((req, res) => {
    department.find()
           .then(departments => res.json(departments))
           .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
    const department = req.body.department;
        
    const newdepartment = new department({
        department,
    });

    newdepartment.save()
    .then(() => res.json('department added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;