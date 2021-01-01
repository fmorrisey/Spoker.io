"use strict";
const router = require('express').Router();
let Department = require('../models/department.model');

router.route('/').get((req, res) => {
    Department.find()
           .then(departments => res.json(departments))
           .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
    const department = req.body.department;
        
    const newdepartment = new Department({
        department,
    });

    newdepartment.save()
    .then(() => res.json('Department added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;