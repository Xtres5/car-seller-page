const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt'); // for hashing passwords
const User = require('../models/user'); // Assuming you have a User model

// Registration form route (GET)
router.get('/register', (req, res) => {
  res.render('register'); // You need to set up your view engine and templates for rendering
});

router.post('/register', async (req, res) => {
    try {
        const {email, password, firstName, lastName, birthDate, phoneNumber, dni} = req.body;
        const existingUser = await User.findOne({ email });
        if (existingUser) {
          return res.status(400).json({ message: 'Email is already in use' });
        }
    
        const hashedPassword = await bcrypt.hash(password, 10);
    
        const newUser = new User({email, password: hashedPassword, firstName, lastName, birthDate, phoneNumber, dni});

        await newUser.save();
    
        res.status(201).json({ message: 'User registered successfully' });
      } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal server error' });
      }
});

module.exports = router;