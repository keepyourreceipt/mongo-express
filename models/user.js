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
  },
  profileImg: {
    type: String,
    required: false,
    unieuq: true,
    trim: false
  }
});

// authenticate input against documents
UserSchema.statics.authenticate = function(email, password, callback) {

    // Call mongoose findOne method on the User schema to query database
    User.findOne( {email: email} )

      // Execute query against database
      .exec(function( error, user ) {

        // If error returned
        if (error) {

          // Call the supplied callback function and pass error as argument
          return callback(error);

          // Check that a user exists in the database
        } else if (!user) {

          // If no user exists, throw error to error handler
          var error = new Error('User not found');
          error.status = 401;
          return callback(error);
        }

        // If user exists with matching email address, compare supplied password with
        // password in database using bcrypt compare method
        bcrypt.compare(password, user.password, function(erorr, result) {

          // If result is true, passwords match
          if ( result === true ) {

            // Call the supplied callback function and pass null for error value and
            // the user? info along with the function
            return callback(null, user);
          } else {
            // Passwords did not match
            return callback();
          }
        });
      });
}

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
