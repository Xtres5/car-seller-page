const express = require('express');
const router = express.Router();
const Car = require('../models/car');

router.get('/', async (req, res) => {
    const cars = await Car.find();
    res.render('home', {cars});
  });

  module.exports = router;