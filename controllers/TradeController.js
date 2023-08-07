const Trade = require('../models/Trade');

exports.getAllTrades = async (req, res) => {
  try {
    const trades = await Trade.find();
    res.status(200).json(trades);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred' });
  }
};

exports.getTradeById = async (req, res) => {
  try {
    const trade = await Trade.findById(req.params.id);
    if (!trade) {
      return res.status(404).json({ message: 'Trade not found' });
    }
    res.status(200).json(trade);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred' });
  }
};

exports.createTrade = async (req, res) => {
  try {
    const newTrade = await Trade.create(req.body);
    res.status(201).json(newTrade);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred' });
  }
};

exports.updateTrade = async (req, res) => {
  try {
    const updatedTrade = await Trade.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedTrade) {
      return res.status(404).json({ message: 'Trade not found' });
    }
    res.status(200).json(updatedTrade);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred' });
  }
};

exports.deleteTrade = async (req, res) => {
  try {
    const deletedTrade = await Trade.findByIdAndDelete(req.params.id);
    if (!deletedTrade) {
      return res.status(404).json({ message: 'Trade not found' });
    }
    res.status(204).json();
  } catch (error) {
    res.status(500).json({ error: 'An error occurred' });
  }
};

// Retrieve security to which the trade belongs

exports.filterSecurityTrade=async(req,res) => {
  try{
    const trade=await Trade.findById(req.params.id);
    if (!trade)
    {
      return res.status(404).json({message:'Trade not found'});
    }
    const securityId=trade.SecurityId;
    const Security=require('../models/Security');
    const security=await Security.findById(securityId);
    if (!security)
    {
      return res.status(404).json({message:'Security not found'});
    }
    res.status(200).json(security);

  }
  catch (error)
  {
    res.status(500).json({ error: 'An error occurred' });
  }
}

// Get all trades for a security (Filter trades by security id)
