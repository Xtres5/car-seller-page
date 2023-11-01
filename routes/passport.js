const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user'); // Import your User model
const bcrypt = require('bcrypt');

// Use LocalStrategy for user authentication
passport.use(new LocalStrategy(
    {
      usernameField: 'email',
      passwordField: 'password',
    },
    async (email, password, done) => {
      try {
        const user = await User.findOne({ email });
  
        if (!user) {
          return done(null, false, { message: 'User not found' });
        }
  
        const isMatch = await bcrypt.compare(password, user.password);
  
        if (isMatch) {
          return done(null, user);
        } else {
          return done(null, false, { message: 'Incorrect password' });
        }
      } catch (error) {
        return done(error);
      }
    }
  ));

// Serialize and deserialize user
passport.serializeUser((user, done) => {
    done(null, user.id);
  });
  
passport.deserializeUser(async (id, done) => {
    try {
      const user = await User.findById(id).exec();
      done(null, user);
    } catch (error) {
      done(error);
    }
  });

module.exports = passport;