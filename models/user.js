// Require application modules
const mongoose = require('mongoose');

// Create new mongoose schema 'User'
var UserSchema = new mongoose.Schema {
  name: {
    type: String,
    required: true,
    unique: false,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  password: {
    type: String,
    required: true,
    unique: false,
    trim: false
  }
}

// Assign mongoose model to 'User' variable
var User = mongoose.model('User', UserSchema);

// Export user module to make model accessible to the rest of the app
module.exports = User;
