const express = require('express');
const router = express.Router();
const Car = require('../models/car');
const upload = require('./cloudinary');
const cloudinary = require('cloudinary').v2;

// Set up your Cloudinary configuration here
router.get('/upload', (req, res) => {
  res.render('upload'); // You need to set up your view engine and templates for rendering
});

// Create a route for image uploads
router.post('/upload', upload.array('images'), async (req, res) => {
  try {
    const images = [];

    // Loop through the uploaded files and upload them to Cloudinary
    for (const file of req.files) {
      const result = await cloudinary.uploader.upload(file.path);
      images.push(result.public_id);
    }

    // Create a new car record and save the image IDs in the database
    const { make, model, year, price } = req.body;
    const car = new Car({ make, model, year, price, images: images.join(',') });

    await car.save();

    res.json({ success: true, car });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to upload images' });
  }
});

module.exports = router;