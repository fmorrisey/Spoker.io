"use strict";

// Package dependencies
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const passport = require('passport');
const bodyParser = require('body-parser');

const app = express();

const port = process.env.PORT || 5000;

require('dotenv').config();

app.use(cors());
app.use(express.json());

//===========PASSORT x JWTAuth=============
require('./auth/config/passport');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(passport.initialize());

const loginUser = require('./auth/routes/loginUser');
const registerUser = require('./auth/routes/registerUser');
const findUser = require('./auth/routes/findUser');
const deleteUser = require('./auth/routes/deleteUser');
const updateUser = require('./auth/routes/updateUser');


//===========MONGOOSE x MongoDB=============
// connection string parser for MongoDB
// connection constructor 
const uri = process.env.ATLAS_URI;
mongoose.connect(uri, {
    useNewUrlParser: true, 
    useCreateIndex: true,
    useUnifiedTopology: true //added 12.22 to use newest
});
const connection = mongoose.connection;

connection.once('open', () =>{
    console.log('MongoDB database connection established successfully')
})

// connection port messages for successful launch!
app.listen(port, () => {
    console.log(`Spoker is live! Running on port: ${port}` );
});

//===========ROUTERS==============
const productsRouter = require('./inventory/routes/product');
const brandsRouter = require('./inventory/routes/brand');
const categoriesRouter = require('./inventory/routes/category');
const departmentsRouter = require('./inventory/routes/department');
//... More routers to come

app.use('/products', productsRouter);
app.use('/brands', brandsRouter);
app.use('/categories', categoriesRouter);
app.use('/departments', departmentsRouter);

module.exports = app;