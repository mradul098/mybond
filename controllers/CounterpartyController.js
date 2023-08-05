const Counterparty = require('../models/Counterparty');

exports.getAllCounterparties = async (req, res) => {
  try {
    const counterparties = await Counterparty.find();
    res.status(200).json(counterparties);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred' });
  }
};

exports.getCounterpartyById = async (req, res) => {
  try {
    const counterparty = await Counterparty.findById(req.params.id);
    if (!counterparty) {
      return res.status(404).json({ message: 'Counterparty not found' });
    }
    res.status(200).json(counterparty);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred' });
  }
};

exports.createCounterparty = async (req, res) => {
  try {
    const newCounterparty = await Counterparty.create(req.body);
    res.status(201).json(newCounterparty);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred' });
  }
};

exports.updateCounterparty = async (req, res) => {
  try {
    const updatedCounterparty = await Counterparty.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedCounterparty) {
      return res.status(404).json({ message: 'Counterparty not found' });
    }
    res.status(200).json(updatedCounterparty);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred' });
  }
};

exports.deleteCounterparty = async (req, res) => {
  try {
    const deletedCounterparty = await Counterparty.findByIdAndDelete(req.params.id);
    if (!deletedCounterparty) {
      return res.status(404).json({ message: 'Counterparty not found' });
    }
    res.status(204).json();
  } catch (error) {
    res.status(500).json({ error: 'An error occurred' });
  }
};
