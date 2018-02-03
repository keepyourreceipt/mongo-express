// Require application modules
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const session = require('express-session');
const routes = require('./routes');


// Set database connection info and credentials
const databaseHost = 'mongodb://localhost:27017/';
const databaseName = 'mongo-express';

// Instantiate express app
const app = express();

// Track sessions for logged in users
app.use(session({
  secret: "mongo-express session secret",
  resave: true,
  saveUninitialized: false
}));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// USer router as defined in /routes dir
app.use(routes);

// Add static server and server static assets from /public dir
app.use(express.static(__dirname + '/public'));

// Set default template engine to use pug / jade
app.set('view engine', 'pug');

// Connect to MongoDB using mongoose
mongoose.connect(databaseHost + databaseName);

// Store a reference to the DB connection in a variable
var dbConnection = mongoose.connection;

// Check for database connection errors and output to console
dbConnection.on('error', console.error.bind(console, 'Database connection error: '));

// Add middleware to catch 404 errors
app.use( (req, res, next) => {
    const error = new Error('Page not found');
    error.status = 404;
    next(error);
});

// Throw an error to test error handling middleware
// app.use( (req, res, next) => {
//     const error = new Error("This is an error");
//     error.status = 401;
//     next(error);
// });

// Error handling middleware
app.use( (err, req, res, next) => {
    res.locals.error = err;
    if ( err.status ) {
      res.status(err.status);
    } else {
      res.status(500);
    }
    res.render('error');
});

// Init express server on port 3000
app.listen(3000, () => {
  console.log("Express server running on port 3000");
});
