"use strict";
const router = require('express').Router();
const Order = require('../models/order.model').Order;
const Address = require('../models/address.model');
const { auth } = require('../../auth/middleware/auth');
const Str = require('@supercharge/strings')

const random = Str.random() 
//=========GET============
router.route('/').get((req, res) => {
    Order.find()
    .then(orders => res.json(orders))
    .catch(err => res.status(400).json('Error: ' + err));
});

//=========GET BY ID============
router.route('/:id').get([auth], (req, res) => {
    Order.findById(req.params.id)
    .then(order => res.json(order))
    .catch(err => res.status(400).json('Error: ' + err))
});


//=========CREATE/ADD ORDER============
router.post('/add', [auth], (req, res) => {
    console.log("req: ", req.body)
    const user = req.user.id;
    const prodId = [req.body.prodId];
    const trackingNumber = Str.random(15);
    const orderStatus = req.body.orderStatus;
    const pickUpStatus = req.body.pickUpStatus; 
    const address = findAddressById(req.user.address);
    //Remember to add product check!
    const newOrder = new Order({
        user,
        trackingNumber,
        prodId,
        orderStatus,
        pickUpStatus,        
        address,
    });

    console.log("New Order: ",newOrder);
    newOrder.save()
    .then(() => res.json('Order added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});


//============UPDATE======
router.route('/update/:id').post((req, res) => {
    Order.findById(req.params.id)
           .then(order => {
            if (req.body.prodId != order.prodId) {
                order.prodId.push(req.body.prodId);
            }
            order.trackingNumber = req.body.trackingNumber;
            order.orderStatus = req.body.orderStatus;
            order.pickUpStatus = req.body.pickUpStatus; 
            order.address = req.body.address;
    
            order.save()
            .then(() => res.json(' Updated!' + order))
            .catch(err => res.status(400).json('Error: ' + err));
           })

});


//============DELETE======
router.route('/:id').delete((req, res) => {
    Order.findByIdAndDelete(req.params.id)
           .then(() => res.json('Product Deleted'))
           .catch(err => res.status(400).json('Error: ' + err));
});

//============Helper Functions=============
 function findAddressById(addressId) {
     Address.findById(addressId).populate('user', '_id')
     .then(address => {return address})
 };
/*
function findAddressById(addressId) {
    Address.findById(addressId).populate('user', '_id')
    .then(address => {
        // if address does not exist, or address exist but it was from a guest user, or exists and belongs to another user
        if (!address || !address.user || address.user.id !== req.user.id)
            return res.status(401).json(('You do not own this address'));
        else {
            return createOrderWithAddress(res, req.body.cart_items, address, req.user);
        }
    }).catch(err => {
    throw err;
    });
    };
*/






module.exports = router;