const express = require('express');
const router = express.Router();
const User = require('../models/user'); // Assuming you have a User model
const bcrypt = require('bcrypt'); // Import bcrypt

// Registration form route (GET)
router.get('/login', (req, res) => {
  res.render('login'); // You need to set up your view engine and templates for rendering
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find the user by email
    const user = await User.findOne({ email });

    if (!user) {
      // User not found
      return res.redirect('/login');
    }

    // Compare the provided password with the hashed password stored in the database
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      // Incorrect password
      return res.redirect('/login');
    }

    // Successful login, you can set a session or token here
    res.redirect('/index'); // Redirect to a dashboard or user profile page
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = router;