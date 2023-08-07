const Security = require('../models/Security');

exports.getAllSecurities = async (req, res) => {
  try {
    const securities = await Security.find();
    res.status(200).json(securities);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred' });
  }
};

exports.getSecurityById = async (req, res) => {
  try {
    const security = await Security.findById(req.params.id);
    if (!security) {
      return res.status(404).json({ message: 'Security not found' });
    }
    res.status(200).json(security);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred' });
  }
};

exports.createSecurity = async (req, res) => {
  try {
    const newSecurity = await Security.create(req.body);
    res.status(201).json(newSecurity);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred' });
  }
};

exports.updateSecurity = async (req, res) => {
  try {
    const updatedSecurity = await Security.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedSecurity) {
      return res.status(404).json({ message: 'Security not found' });
    }
    res.status(200).json(updatedSecurity);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred' });
  }
};

exports.deleteSecurity = async (req, res) => {
  try {
    const deletedSecurity = await Security.findByIdAndDelete(req.params.id);
    if (!deletedSecurity) {
      return res.status(404).json({ message: 'Security not found' });
    }
    res.status(204).json();
  } catch (error) {
    res.status(500).json({ error: 'An error occurred' });
  }
};

// Get securities by date range
