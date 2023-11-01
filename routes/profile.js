const express = require('express');
const router = express.Router();
const User = require('../models/user'); // Import your User model 

router.get('/profile', (req, res) => {
    // Access and log the user data from the session
    console.log(req.session.user);
  
    // Render the profile page with user data (you can use it in your template)
    res.render('profile', { user: req.session.user });
  });

module.exports = router;