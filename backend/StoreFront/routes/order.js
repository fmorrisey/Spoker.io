"use strict";
const router = require('express').Router();
const Order = require('../../inventory/models/order.model').Order;
const { auth } = require('../../auth/middleware/auth');
const Str = require('@supercharge/strings')

const random = Str.random() 

router.route('/').get((req, res) => {
    Order.find()
           .then(orders => res.json(orders))
           .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get([auth], (req, res) => {
    Order.findById(req.params.id)
         .then(order => res.json(order))
         .catch(err => res.status(400).json('Error: ' + err))
});

router.post('/add', [auth], (req, res) => {
    console.log("req: ", req.body)
    const user = req.user.id;
    const trackingNumber = Str.random(15);
    const orderStatus = Order.getOrderStatusString;
    const pickUpStatus = req.body.pickupStatus;    
    const street1 = req.body.street1;
    const street2 = req.body.street2;
    const city = req.body.city;
    const state = req.body.state;
    const country = req.body.country;
    const zipCode = req.body.zip;

    const newOrder = new Order({
        trackingNumber,
        orderStatus,
        pickUpStatus,        
        user,
        street1,
        street2,
        city,
        state,
        country,
        zipCode,
    });

    console.log("newORder: ",newOrder);
    newOrder.save()
    .then(() => res.json('Order added!'))
    .catch(err => res.status(400).json('Error: ' + err));


});

module.exports = router;