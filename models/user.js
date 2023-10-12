const mongoose = require('mongoose');

// Define a schema for user accounts
const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true, // Ensure email addresses are unique
    lowercase: true, // Store email addresses in lowercase
    trim: true,   // Remove leading/trailing whitespace
  },
  password: {
    type: String,
    required: true,
  },
  firstName: {
    type: String,
    required: true,
    trim: true,
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
  },
  birthDate: {
    type: Date,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  dni: {
    type: String,
    unique: true, // Ensure DNIs are unique
    trim: true,
    required: true,
    match: /^(\d{7,8})$/ // Match the Argentina DNI format (7 or 8 digits)
  },
});

// Create a model from the schema
const User = mongoose.model('User', userSchema);

module.exports = User;