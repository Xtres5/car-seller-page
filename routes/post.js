const express = require('express');
const router = express.Router();
const Car = require('../models/car');

router.get('/post/:carId', async (req, res) => {
  try {
    const carId = req.params.carId;
    const car = await Car.findById(carId);
    if (!car) {
      return res.status(404).send('Car not found');
    }

    res.render('post', { car }); // Render your car template with the retrieved car document
  } catch (error) {
    console.error(error);
    res.status(500).send('Error retrieving car');
  }


});

  module.exports = router;