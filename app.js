// Add express and init express app
const express = require('express');
const app = express();

const mongoose = require('mongoose');

// Connect to Mongo DB using mongoose
mongoose.connect("mongodb://localhost:27017/mongo-express");

// Store a reference to the DB connection in a variable
var dbConnection = mongoose.connection;

// Check for cdatabase connection errors and output to console
dbConnection.on('error', console.error.bind(console, 'Database connection error: '));

// Throw an error to middleware
app.use( (req, res, next) => {
    var err = new Error("This is an error");
    next(err);
});

// Provide error handling middleware
app.use( (err, req, res, next) => {
    res.locals.error = err;
    res.render('error');
});

// Add reference to router and use routes constant as middleware
const routes = require('./routes');
app.use(routes);

// Set default template engine to use pug / jade
app.set('view engine', 'pug');

// Add static server
app.use(express.static('./public'));

// Listen for requests on port 3000
app.listen(3000, () => {
  console.log("Express server running on port 3000");
});
