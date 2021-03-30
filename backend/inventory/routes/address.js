const router = require("express").Router();
const Address = require("../../inventory/models/address.model");
const { auth } = require("../../auth/middleware/auth");

const validateAddressInput = require("../../auth/validation/address");

router.route("/").get((req, res) => {
  Address.find()
    .then((address) => res.json(address))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.get("/customer/", [auth], (req, res) => {
  //console.log(req.user.id)
  Address.findOne({ user: req.user.id })
    .then((address) => res.json(address))
    .catch((err) => res.status(400).json("Error: " + err));
});

//============CRUDs==============
router.post("/add", [auth], (req, res) => {
  const { errors, isValid } = validateAddressInput(req.body);
  // Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  const street1 = req.body.street1;
  const street2 = req.body.street2;
  const city = req.body.city;
  const state = req.body.state;
  const country = req.body.country;
  const zipCode = req.body.zipCode;
  const user = req.user.id;
  const orders = req.body.orders;

  const newAddress = new Address({
    street1,
    street2,
    city,
    state,
    country,
    zipCode,
    user,
    orders,
  });

  console.log(newAddress);
  newAddress
    .save()
    .then(() => res.json("Address added!"))
    .catch((err) => res.status(400).json("Error: " + err));
});

//============GET BY ID======
router.route("/:id").get((req, res) => {
  Address.findById(req.params.id)
    .then((address) => res.json(address))
    .catch((err) => res.status(400).json("Error: " + err));
});

//============DELETE======
router.route("/:id").delete((req, res) => {
  Address.findByIdAndDelete(req.params.id)
    .then(() => res.json("Address Deleted"))
    .catch((err) => res.status(400).json("Error: " + err));
});

//============Create ADD================

//============UPDATE======
router.post("/update/customer", [auth], (req, res) => {
  Address.findOne({ user: req.user.id }).then((address) => {
    if (address === null) {
      console.log("Create address");
      const { errors, isValid } = validateAddressInput(req.body);
      // Check validation
      if (!isValid) {
        return res.status(400).json(errors);
      }
      const street1 = req.body.street1;
      const street2 = req.body.street2;
      const city = req.body.city;
      const state = req.body.state;
      const country = req.body.country;
      const zipCode = req.body.zipCode;
      const user = req.user.id;
      const orders = req.body.orders;

      const newAddress = new Address({
        street1,
        street2,
        city,
        state,
        country,
        zipCode,
        user,
        orders,
      });

      console.log(newAddress);
      newAddress
        .save()
        .then(() => res.json("Address added!"))
        .catch((err) => res.status(400).json("Error: " + err));
    } else {
      console.log("update address");
      Address.findOne({ user: req.user.id }).then((address) => {
        console.log(address);
        console.log(address);
        address.street1 = req.body.street1;
        address.street2 = req.body.street2;
        address.city = req.body.city;
        address.state = req.body.state;
        address.country = req.body.country;
        address.zipCode = req.body.zipCode;

        address
          .save()
          .then(() => res.json("Address Updated"))
          .catch((err) => res.status(400).json("Error: " + err));
      });
    }
  });
});

router.route("/update/byID/:id").post((req, res) => {
  Address.findById(req.params.id).then((address) => {
    address.street1 = req.body.street1;
    address.street2 = req.body.street2;
    address.city = req.body.city;
    address.state = req.body.state;
    address.country = req.body.country;
    address.zipCode = req.body.zipCode;

    address
      .save()
      .then(() =>
        res.json(
          `${address.user.first_name} ${address.street1} ${address.street2} ${address.city} ${address.state}, ${address.zipCode} Updated!`
        )
      )
      .catch((err) => res.status(400).json("Error: here " + err));
  });
});

module.exports = router;
