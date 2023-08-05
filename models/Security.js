const mongoose = require('mongoose');

const securitySchema = new mongoose.Schema({
  ISIN: String,
  CUSIP: String,
  Issuer: String,
  MaturityDate: Date,
  Coupon: Number,
  Type: String,
  FaceValue: Number,
  Status: String,
});

module.exports = mongoose.model('Security', securitySchema);
