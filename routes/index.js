// Require express and init router
const express = require('express');
const User = require('../models/user');
const router = express.Router();

// Add root route
router.get('/', (req, res, next) => {
  res.render('main');
});

// Add a get route for the signup page
router.get('/signup', (req, res, next) => {
  res.render('signup');
});

// POST /signup
router.post('/signup', (req, res, next) => {
  if ( req.body.name && req.body.email && req.body.password ) {

    // Build object to insert into database
    var userData = {
      name: req.body.name,
      email: req.body.email,
      password: req.body.password
    }

    User.create(userData, (err, user) => {
      // If there's an error inserting the document, throw error
      if ( err ) {
        var error = new Error('Could not add document to database');
        error.status = 500;
        next(error);
      } else {
        // If there are no errors adding the document, redirect user
        res.redirect('/profile');
      }
    });

  } else {
    // Check that all fields have values
    var error = new Error("All fields are required");
    error.status = 400;
    next(error);
  }
});

// GET profile route
router.get('/profile', (req, res, next) => {
  res.render('profile');
});

// GET login route
router.get('/login', (req, res, next) => {
  res.render('login');
});

// POST login route
router.post('/login', (req, res, next) => {
  res.send('Logged in');
});

// Export module to allow other files to access it
module.exports = router;
