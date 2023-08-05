const BookUser = require('../models/BookUser');

exports.getAllBookUsers = async (req, res) => {
  try {
    const bookUsers = await BookUser.find();
    res.status(200).json(bookUsers);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred' });
  }
};

exports.getBookUserById = async (req, res) => {
  try {
    const bookUser = await BookUser.findById(req.params.id);
    if (!bookUser) {
      return res.status(404).json({ message: 'BookUser not found' });
    }
    res.status(200).json(bookUser);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred' });
  }
};

// const BookUser = require('../models/BookUser');

// const BookUser = require('../models/BookUser');

exports.createBookUser = async (req, res) => {
  try {
    const newBookUser = await BookUser.create(req.body);
    console.log(req.body);
    res.status(201).json(newBookUser);
  } catch (error) {
    res.status(500).json({ error: 'cAn error occurred' });
  }
};



exports.updateBookUser = async (req, res) => {
  try {
    const updatedBookUser = await BookUser.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedBookUser) {
      return res.status(404).json({ message: 'BookUser not found' });
    }
    res.status(200).json(updatedBookUser);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred' });
  }
};

exports.deleteBookUser = async (req, res) => {
  try {
    const deletedBookUser = await BookUser.findByIdAndDelete(req.params.id);
    if (!deletedBookUser) {
      return res.status(404).json({ message: 'BookUser not found' });
    }
    res.status(204).json();
  } catch (error) {
    res.status(500).json({ error: 'An error occurred' });
  }
};
