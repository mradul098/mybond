const mongoose = require('mongoose');

const tradeSchema = new mongoose.Schema({
  CounterpartyId: { type: mongoose.Schema.Types.ObjectId, ref: 'Counterparty' },
  SecurityId: { type: mongoose.Schema.Types.ObjectId, ref: 'Security' },
  Quantity: Number,
  Status: String,
  Price: Number,
  Buy_Sell: String,
  TradeDate: Date,
  SettlementDate: Date,
});

module.exports = mongoose.model('Trade', tradeSchema);
