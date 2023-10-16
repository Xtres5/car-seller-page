const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt'); // for hashing passwords
const User = require('../models/user'); // Assuming you have a User model

// Registration form route (GET)
router.get('/register', (req, res) => {
  res.render('register'); // You need to set up your view engine and templates for rendering
});

// Registration form submission route (POST)
router.post('/register', async (req, res) => {
    try {
        // Extract user data from the request body
        const {email, password, firstName, lastName, birthDate, phoneNumber, dni} = req.body;
        // Check if the email or username is already in use
        const existingUser = await User.findOne({ email });
        if (existingUser) {
          return res.status(400).json({ message: 'Email is already in use' });
        }
    
        const hashedPassword = await bcrypt.hash(password, 10);
    
        // Create a new user document using the User model
        const newUser = new User({
          email,
          password: hashedPassword,
          firstName,
          lastName,
          birthDate,
          phoneNumber,
          dni,
        });
    
        // Save the new user to the database
        await newUser.save();
    
        // Send a success response
        res.status(201).json({ message: 'User registered successfully' });
      } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal server error' });
      }
});

module.exports = router;