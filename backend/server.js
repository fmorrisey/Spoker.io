// Package dependencies
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;
const connection = mongoose.connection;

app.use(cors());
app.use(express.json());


//===============================
// connection string parser for MongoDB
const uri = process.env.ATLAS_URI;
mongoose.connect(uri, {
    useNewUrlParser: true, 
    useCreateIndex: true
});


connection.once('open', () =>{
    console.log('MongoDB database connection established successfully')
})

//================================

// connection port messages for successful launch!
app.listen(port, () => {
    console.log(`Spoker is live! Running on port: ${port}` );
});

