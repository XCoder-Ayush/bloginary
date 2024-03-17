const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true
  },
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  profilePictureURL: {
    type: String,
    default: null
  }
},{timestamps: true});

const User = mongoose.model('User', userSchema);

// Singular Form
// First letter capital

// FIrst letter taak small korbe r plural

module.exports = User;
