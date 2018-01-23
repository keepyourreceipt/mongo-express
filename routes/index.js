// Require express and init router
const express = require('express');
const router = express.Router();

// Add root route
router.get('/', (req, res, next) => {
  res.render('layout');
});

// Add a get route for the signup page
router.get('/signup', (req, res, next) => {
  res.render('signup');
});

// Export module to allow other files to access it
module.exports = router;
