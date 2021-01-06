"use strict";
const router = require('express').Router();
const Order = require('../../inventory/models/order.model').Order;
const Address = require('../../inventory/models/address.model');
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

exports.findAddressById = async function (addressId) {
    Address.findById(addressId).populate('user', '_id')
           .then(address => {return address})
};

router.post('/add', [auth], (req, res) => {
    console.log("req: ", req.body)
    const user = req.user.id;
    const trackingNumber = Str.random(15);
    const orderStatus = req.body.orderStatus;
    const pickUpStatus = req.body.pickUpStatus; 
    const address = findAddressById(req.user.address);

    const newOrder = new Order({
        trackingNumber,
        orderStatus,
        pickUpStatus,        
        user,
        address,
    });

    console.log("New Order: ",newOrder);
    newOrder.save()
    .then(() => res.json('Order added!'))
    .catch(err => res.status(400).json('Error: ' + err));


});

module.exports = router;