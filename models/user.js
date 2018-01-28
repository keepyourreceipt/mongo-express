// Require application modules
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

// Create new mongoose schema 'User'
var UserSchema = new mongoose.Schema ({
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
});

// Hash pasword to securely save value in database
UserSchema.pre('save', function(next) {
  var user = this;

  // Hash method take three arguments: plain text password, salt level, callback
  bcrypt.hash(user.password, 10, function(err, hash) {
    if ( err ) {

      // If error, throw error
      var error = new Error("Could not hash password");
      error.status = 500;
      next(error);
    } else {

      // If no errors, replace entered password string with hash
      user.password = hash;
      next();
    }
  });
});

// Assign mongoose model to 'User' variable
var User = mongoose.model('User', UserSchema);

// Export user module to make model accessible to the rest of the app
module.exports = User;
