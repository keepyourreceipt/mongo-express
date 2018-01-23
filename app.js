// Add express and init express app
const express = require('express');
const app = express();

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
