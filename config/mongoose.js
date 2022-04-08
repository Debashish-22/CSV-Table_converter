// Mongoose configuration

const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/csv-table');

const db = mongoose.connection;

db.on('error', console.error.bind(console, "Error connecting to Database"));

db.once('open', ()=>{
    console.log("Successfully connected to Database");
});