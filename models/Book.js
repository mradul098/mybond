// models/Book.js
const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  BookName: String,
});

module.exports = mongoose.model('Book', bookSchema);
