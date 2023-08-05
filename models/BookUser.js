const mongoose = require('mongoose');

const bookUserSchema = new mongoose.Schema({
  BookId: { type: mongoose.Schema.Types.ObjectId, ref: 'Book' },
  UserId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
});

module.exports = mongoose.model('BookUser', bookUserSchema);
