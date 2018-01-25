// Require express and init router
const express = require('express');
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
  res.send("Post to /signup");
});

// Export module to allow other files to access it
module.exports = router;
