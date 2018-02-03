// Require express and init router
const express = require('express');
const User = require('../models/user');
const router = express.Router();
const multer  = require('multer')
const upload = multer({ dest: './public/uploads/' })

// Add root route
router.get('/', (req, res, next) => {
  res.render('main');
});

// Add a get route for the signup page
router.get('/signup', (req, res, next) => {
  res.render('signup');
});

// POST /signup
router.post('/signup', upload.single('avatar'), (req, res, next) => {
  if ( req.body.name && req.body.email && req.body.password ) {

    // Build object to insert into database
    var userData = {
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      profileImg: "uploads/" + req.file.filename
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
  // If the user does not have a session ID, throw access error
  if ( ! req.session.userId ) {
    var error = new Error('Please login to view this content');
    error.status = 403;
    next(error);
  } else {

    // Find user by session id, and execute query
    User.findById(req.session.userId).exec(function( error, user ) {
      if ( error ) {
        next(error);
      } else {
        // If no errors returned, render profile template and pass user data
        res.render('./profile', { title: 'Profile', username: user.name, email: user.email, profileImg: user.profileImg });
      }
    });
  }
});

// GET login route
router.get('/login', (req, res, next) => {
  res.render('login');
});

// POST login route
router.post('/login', (req, res, next) => {
  if ( req.body.email && req.body.password ) {
    // Call authenticate function on User scheme as defined in user.js
    User.authenticate(req.body.email, req.body.password, function(error, user) {

      // If error passed back by the authenticate function or user does not exist
      // throw new error
      if ( error || !user ) {
        var error = new Error("Could not log in");
        error.status = 401;
        return next(error);
      } else {

        // If no errors, create session and assign session user id to user(document) id from database
        req.session.userId = user._id;

        // User is authenticated, redirect user to profile page
        return res.redirect('/profile');
      }
    });
  } else {
    // Form missing fields
    var error = new Error('All fields are required');
    error.status = 401;
    next(error);
  }
});

// Export module to allow other files to access it
module.exports = router;
