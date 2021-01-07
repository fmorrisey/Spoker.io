"use strict";
const router = require("express").Router();
const Order = require("../models/order.model");
const Address = require("../models/address.model");
const { auth } = require("../../auth/middleware/auth");
const Str = require("@supercharge/strings");

const random = Str.random();
//=========GET============
router.route("/").get((req, res) => {
  Order.find()
    .then((orders) => res.json(orders))
    .catch((err) => res.status(400).json("Error: " + err));
});

//=========GET BY ID============
//======CURRENTLY BROKEN========
router.route('/id/:id').get((req, res) => {
    Order.findById(req.params.id)
           .then(order => res.json(order))
           .catch(err => res.status(400).json('Error: ' + err));
});

//=========FIND CUSTOMER'S ORDERS============
router.get("/customer", [auth], (req, res) => {
  console.log("by customer", req.user.id);
  Order.findOne({ user: req.user.id })
    .then((order) => res.json(order))
    .catch((err) => res.status(400).json("Error: " + err));
});

//=========CREATE/ADD ORDER============
router.post("/add", [auth], (req, res) => {
  res = createOrderWithAddress(req, res);
});

async function createOrderWithAddress(req, res) {
  //console.log("req: ", req.body);
  //console.log("user: ", req.user.id);
  const user = req.user.id;
  const prodId = [req.body.prodId];
  const trackingNumber = Str.random(15);
  const orderStatus = "PROCESSED";
  const pickUpStatus = req.body.pickUpStatus;
  const address = await findAddressById(req);
  //Remeber to add product check!
  //console.log("address return: ", address);

  const newOrder = new Order({
    user,
    trackingNumber,
    prodId,
    orderStatus,
    pickUpStatus,
    address,
  });
  console.log("New Order: ", newOrder);
  newOrder
    .save()
    .then(() => res.json("Order added!"))
    .catch((err) => res.status(400).json("Error: " + err));
  return await res;
}

//============UPDATE======
router.route("/update/:id").post((req, res) => {
  Order.findById(req.params.id).then((order) => {
    if (req.body.prodId != order.prodId) {
      order.prodId.push(req.body.prodId);
    }
    order.trackingNumber = req.body.trackingNumber;
    order.orderStatus = req.body.orderStatus;
    order.pickUpStatus = req.body.pickUpStatus;
    order.address = req.body.address;

    order
      .save()
      .then(() => res.json(" Updated!" + order))
      .catch((err) => res.status(400).json("Error: " + err));
  });
});

//============DELETE======
router.route("/:id").delete((req, res) => {
  Order.findByIdAndDelete(req.params.id)
    .then(() => res.json("Product Deleted"))
    .catch((err) => res.status(400).json("Error: " + err));
});

//============Helper Functions=============
async function findAddressById(req) {
  //console.log("addID: ",req.user.id);
  let userAddress = await Address.findOne({ user: req.user.id });
  console.log("address found ", userAddress);
  return userAddress;
}

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
