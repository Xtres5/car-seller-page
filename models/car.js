const mongoose = require('mongoose');

const carSchema = new mongoose.Schema({
  make: {
    type: String,
    required: true,
  },
  model: {
    type: String,
    required: true,
  },
  year: {
    type: Number,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  images: [
    {
      type: String, // Store image URLs
    },
  ],
  // You can add more fields as needed, such as description, owner, etc.
});

const Car = mongoose.model('Car', carSchema);

module.exports = Car;




