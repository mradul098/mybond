const mongoose = require('mongoose');

const counterpartySchema = new mongoose.Schema({
  Name: String,
});

module.exports = mongoose.model('Counterparty', counterpartySchema);
