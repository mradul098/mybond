const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  Name: String,
  Email: String,
  Role: String,
});

module.exports = mongoose.model('User', userSchema);
