const router = require("express").Router();
const Order = require("../models/order.model");
const Address = require("../models/address.model");
const Product = require("../models/product.model");
const { auth } = require("../../auth/middleware/auth");
const Str = require("@supercharge/strings");

//==================GET=====================
router.route("/").get((req, res) => {
  Order.find()
    .then((orders) => res.json(orders))
    .catch((err) => res.status(400).json("Error: " + err));
});


router.route("/getSold").get((req, res) => {
  Product.find({ status: "SOLD" })
    .then((product) => res.json(product))
    .catch((err) => res.status(400).json("Error: " + err));
});

// ---------------- SALES DATA -------------------
router.route("/getSales").get((req, res) => {
  Product.find({ status: "SOLD" }) // Strict status reference must be all caps "SOLD", finds all sold products
    .then((products) => {
      // Calculate the sum of products sold
      let retailSales = products.map(li => li.price).reduce(sumReducer, 0);
      let msrpCost = products.map(li => li.msrp).reduce(sumReducer, 0);

      let profit = retailSales - msrpCost; // profit margins
      let percentage = (profit / msrpCost) * 100; // percentages

      percentage = roundAccurately(percentage, 2); // rounds percentages 

      // Builds the return JSON Data for the frontend
      const salesData = { retailSales, msrpCost, profit, percentage }; 
      res.json(salesData);
    })
    .catch((err) => res.status(400).json("Error: " + err));
});

//==================PROFIT MARGINS====================
// ---------------- INVENTORY DATA -------------------
router.route("/margins").get((req, res) => {
  Product.find({ status: { $ne: "SOLD" } }) // Finds all products that are not sold
    .then((products) => {
      // Calculates the sum of products still in inventory
      let retailSales = products.map(li => li.price).reduce(sumReducer, 0);
      let msrpCost = products.map(li => li.msrp).reduce(sumReducer, 0);

      let profit = retailSales - msrpCost; // profit margins
      let percentage = (profit / msrpCost) * 100; // percentage of that margin

      percentage = roundAccurately(percentage, 2); // round percentage

      // Builds the return JSON Data for the frontend
      const salesData = { retailSales, msrpCost, profit, percentage };
      res.json(salesData);
    })
    .catch((err) => res.status(400).json("Error: " + err));
});

//=========GET BY ID============
router.route("/id/:id").get((req, res) => {
  Order.findById(req.params.id)
    .then((order) => res.json(order))
    .catch((err) => res.status(400).json("Error: " + err));
});

//=========FIND CUSTOMER'S ORDERS============
router.get("/customer/purchase", [auth], (req, res) => {
  //console.log("by customer", req.user.id);
  Order.findOne({ user: req.user.id })
    .then((order) => res.json(order))
    .catch((err) => res.status(400).json("Error: " + err));
});

//=========FIND CUSTOMER'S ORDERS============
router.get("/customer/list", [auth], (req, res) => {
  //console.log("by customer", req.user.id);
  Order.find({ user: req.user.id })
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
  await findProductMarkSold(req);
  const address = await findAddressById(req);
  const user = req.user.id;
  const customerName = req.user.last_name;
  const prodName = req.body.prodName;
  const prodId = req.body.prodId;
  const price = req.body.price;
  const trackingNumber = Str.random(15);
  const orderStatus = "PROCESSED";
  const pickUpStatus = req.body.pickUpStatus;
  //Remember to add product check!
  //console.log("address return: ", address);

  const newOrder = new Order({
    user,
    customerName,
    trackingNumber,
    prodName,
    prodId,
    price,
    orderStatus,
    pickUpStatus,
    address,
  });
  //console.log("New Order: ", newOrder);
  newOrder
    .save()
    .then((order) => res.json(order))
    .catch((err) => res.status(400).json("Error: " + err));
  return await res;
}

//========================UPDATE========================
//========STILL NEED TO REFLECT UPDATED ORDER MODELS====
router.route("/update/:id").post((req, res) => {
  Order.findById(req.params.id).then((order) => {
    if (req.body.prodId !== order.prodId) {
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
  Order.findById(req.params.id)
    .then((order) => {
      findProductReturnToStock(order);
      Order.findByIdAndDelete(req.params.id)
        .then(() => res.json("Order Deleted"))
        .catch((err) => res.status(400).json("Error: " + err));
    })
    .catch((err) => res.status(400).json("Error: " + err));
});

//============Helper Functions=============
async function findAddressById(req) {
  //console.log("addID: ",req.user.id);
  let userAddress = await Address.findOne({ user: req.user.id });
  //console.log("address found ", userAddress);
  return userAddress;
}

async function findProductMarkSold(req) {
  let soldProduct = await Product.findByIdAndUpdate(req.body.prodId, {
    status: "SOLD",
  });
  //console.log("SOLD", soldProduct);
  return soldProduct;
}

async function findProductReturnToStock(order) {
  let returnToStock = await Product.findByIdAndUpdate(order.prodId, {
    status: "INSTOCK",
  });
  //console.log("INSTOCK", returnToStock);
  return returnToStock;
}

function sumReducer(sum, val) {
  return Number(Math.round(sum + val, 2));
}

// https://gist.github.com/djD-REK/068cba3d430cf7abfddfd32a5d7903c3
// Prevents rounding errors
function roundAccurately(number, decimalPlaces) {
  return Number(Math.round(number + "e" + decimalPlaces) + "e-" + decimalPlaces);
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
