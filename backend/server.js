"use strict";
// Package dependencies
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());


//===============================
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


//================================
// connection port messages for successful launch!
app.listen(port, () => {
    console.log(`Spoker is live! Running on port: ${port}` );
});

//================================
// Routers
const productsRouter = require('./routes/products');
const brandsRouter = require('./routes/brands');
//... More routers to come

app.use('/products', productsRouter);
//app.use('/brands', brandsRouter);