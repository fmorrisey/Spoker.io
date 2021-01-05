"use strict";
const routes = require('express').Router();
const Order = require('../../inventory/models/order.model').Order;
const { auth } = require('../../auth/middleware/auth');

router.get('/:id', [auth], (req, res) => {
    Order.findById(req.params.id)
         .then(order => res.json(order))
         .catch(err => res.status(400).json('Error: ' + err))
});

route.post('/add', [auth], (req, res) => {
    const trackingNumber = req.body.trackingNumber;
    const orderStatus = req.body.orderStatus;
    const pickUpStatus = req.body.pickupStatus;
    const orderItems = req.body.orderItems;
    const user = req.body.user;
    const address = req.body.address;

    const newOrder = new Order({
        trackingNumber,
        orderStatus,
        pickUpStatus,
        orderItems,
        user,
        address,
    });

    newOrder.save()
    .then(() => res.json('order created!', newOrder))
    .catch(err => res.status(400).json('Error: ' + err));

});