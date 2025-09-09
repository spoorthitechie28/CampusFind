const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  // This will be the unique ID from Clerk
  clerkUserId: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('User', userSchema);

