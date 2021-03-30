"use strict";

// Package dependencies
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const passport = require("passport");
const bodyParser = require("body-parser");
const debug = require("debug");

const app = express();

const port = process.env.PORT || 5000;

require("dotenv").config();

app.use(cors());
app.use(express.json());

//===========Body Parser=============
/*===========Depreciated=============
app.use(
    bodyParser.urlencoded({
        extended: false,
    })
    );
    app.use(bodyParser.json());
    
//===================================*/
// Replacement for body parser
app.use(express.urlencoded({ extended: true }));

//===========PASSPORT x JWTAuth=============
//Passport Middleware
app.use(passport.initialize());

//Passport Config
require("./auth/passport")(passport);

const usersRouter = require("./auth/routes/user");
const emailsRouter = require("./auth/routes/email");
//Routes
app.use("/user", usersRouter);
app.use("/email", emailsRouter);

//===========MONGOOSE x MongoDB=============
// connection string parser for MongoDB
// connection constructor
const uri = process.env.ATLAS_URI;
const DEBUG = debug("dev");
mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true, //added 12.22 to use newest
  })
  .then(() => {
    DEBUG("MongoDB is connected");
  })
  .catch((err) => {
    DEBUG("MongoDB connection unsuccessful");
    DEBUG(err);
  });
const connection = mongoose.connection;

connection.once("open", () => {
  console.log("MongoDB database connection established successfully");
});

// connection port messages for successful launch!
app.listen(port, () => {
  console.log(`Spoker is live! Running on port: ${port}`);
});

//===========ROUTERS==============
const productsRouter = require("./inventory/routes/product");
const brandsRouter = require("./inventory/routes/brand");
const categoriesRouter = require("./inventory/routes/category");
const departmentsRouter = require("./inventory/routes/department");
const ordersRouter = require("./inventory/routes/order");
const addressRouter = require("./inventory/routes/address");
const infoRouter = require("./inventory/routes/info");
//... More routers to come

app.use("/products", productsRouter);
app.use("/brands", brandsRouter);
app.use("/categories", categoriesRouter);
app.use("/departments", departmentsRouter);
app.use("/orders", ordersRouter);
app.use("/address", addressRouter);
app.use("/info", infoRouter);

module.exports = app;
