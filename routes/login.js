const express = require('express');
const router = express.Router();
const passport = require('passport');
const bcrypt = require('bcrypt');
const User = require('../models/user'); // Import your User model

router.get('/login', (req, res) => {
  res.render('login'); // This will render views/login.ejs
});

// Define the login route
router.post('/login', (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) {
      console.error(err);
      return next(err);
    }
    if (!user) {
      return res.status(401).json({ message: 'Authentication failed' });
    }
    
    // Log in the user using Passport's req.logIn method
    req.logIn(user, (err) => {
      if (err) {
        console.error(err);
        return next(err);
      }
      
      req.session.user = user;
      // If successful, return a success message
      return res.redirect('/');
    });
  })(req, res, next);
});

module.exports = router;