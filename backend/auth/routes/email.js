const nodeMailer = require("nodemailer");
const router = require("express").Router();
let Email = require("../models/email");
const { auth } = require("../middleware/auth");
require("dotenv").config();

module.exports = router;

//=============EMAIL SENDER==========
router.post("/confirm", [auth], (req, res) => {
  //const from = req.body.from;
  const to = req.user.email;
  const html = req.body.html;

  const message = {
    to,
    from: "forrestMorrisey@gmail.com",
    subject: "New Bike Day!",
    html,
  };


  console.log(message);

  let transporter = nodeMailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        type: 'OAuth2',
        user: 'forrestMorrisey@gmail.com',
        clientId: process.env.clientId,
        clientSecret: process.env.clientSecret,
        refreshToken: process.env.refreshToken,
        accessToken: process.env.accessToken,
    }
  });

  // verify connection configuration
  transporter.verify(function (error, success) {
    if (error) {
      console.log(error);
    } else {
      console.log(success, "Server is ready to take our messages");
    }
  });

  transporter.sendMail(message, (err, result) => {
    if (err) {
      console.log(err);
      return false;
    }
    console.log(result);
    console.log("email sent");
    res.status(200).json(result);
  });
});




//=============EMAIL SENDER==========
router.post("/confirm", [auth], (req, res) => {
  //const from = req.body.from;
  const to = req.user.email;
  const html = req.body.html;

  const message = {
    to,
    from: "forrestMorrisey@gmail.com",
    subject: "New Bike Day!",
    html,
  };


  console.log(message);

  let transporter = nodeMailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        type: 'OAuth2',
        user: 'forrestMorrisey@gmail.com',
        clientId: process.env.clientId,
        clientSecret: process.env.clientSecret,
        refreshToken: process.env.refreshToken,
        accessToken: process.env.accessToken,
    }
  });

  // verify connection configuration
  transporter.verify(function (error, success) {
    if (error) {
      console.log(error);
    } else {
      console.log(success, "Server is ready to take our messages");
    }
  });

  transporter.sendMail(message, (err, result) => {
    if (err) {
      console.log(err);
      return false;
    }
    console.log(result);
    console.log("email sent");
    res.status(200).json(result);
  });
});
