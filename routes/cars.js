const express = require('express');
const router = express.Router();
const Car = require('../models/car');
const upload = require('../routes/cloudinary');

router.get('/upload', (req, res) => {
  res.render('upload'); // You need to set up your view engine and templates for rendering
});

// Handle image upload for a car
router.post('/upload', upload.array('images'), async (req, res) => {
  const imageUrls = req.files.map((file) => file.path);
  console.log(imageUrls);
  const { make, model, year, price } = req.body;
  const car = new Car({ make, model, year, price, images: imageUrls });
  // Save the image URLs to the car model
  await car.save();
  res.json({ car });
});

module.exports = router;