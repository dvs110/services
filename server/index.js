require('dotenv').config();
const mongoose = require('mongoose');
const express = require('express');
const app = express();
const user = require('./user')
const worker = require('./worka')
app.use('/', user)
app.use('/carrers', worker)
const stripe = require("stripe")(process.env.STRIPE_SECRET);

const connect = async () => {
    try {
        await mongoose.connect(process.env.DATABASE);
        console.log("connected to mondodb");
    } catch (error) {
        throw error;
    }
};



mongoose.connection.on('disconnected', () => { //if mongodb got disconnected
    console.log("mongodb disconnected");
});


const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    connect();
    console.log(`Listening on port ${PORT}`)
})
