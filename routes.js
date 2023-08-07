const express = require('express');
const router = express.Router();

const bookController = require('./controllers/BookController');
const bookUserController = require('./controllers/BookUserController');
const userController = require('./controllers/UserController');
const tradeController = require('./controllers/TradeController');
const securityController = require('./controllers/SecurityController');
const counterpartyController = require('./controllers/CounterpartyController');

// Book routes
router.get('/books', bookController.getAllBooks);
router.get('/books/:id', bookController.getBookById);
router.post('/books', bookController.createBook);
router.put('/books/:id', bookController.updateBook);
router.delete('/books/:id', bookController.deleteBook);

// BookUser routes
router.get('/bookusers', bookUserController.getAllBookUsers);
router.get('/bookusers/:id', bookUserController.getBookUserById);
router.post('/bookusers', bookUserController.createBookUser);
router.put('/bookusers/:id', bookUserController.updateBookUser);
router.delete('/bookusers/:id', bookUserController.deleteBookUser);

// User routes
router.get('/users', userController.getAllUsers);
router.get('/users/:id', userController.getUserById);
router.post('/users', userController.createUser);
router.put('/users/:id', userController.updateUser);
router.delete('/users/:id', userController.deleteUser);

// Trade routes
router.get('/trades', tradeController.getAllTrades);
router.get('/trades/:id', tradeController.getTradeById);
router.get('/getSecurityForTrade/:id',tradeController.filterSecurityTrade);
router.post('/trades', tradeController.createTrade);
router.put('/trades/:id', tradeController.updateTrade);
router.delete('/trades/:id', tradeController.deleteTrade);

// Security routes
router.get('/securities', securityController.getAllSecurities);
router.get('/securities/:id', securityController.getSecurityById);
router.post('/securities', securityController.createSecurity);
router.put('/securities/:id', securityController.updateSecurity);
router.delete('/securities/:id', securityController.deleteSecurity);

// Counterparty routes
router.get('/counterparties', counterpartyController.getAllCounterparties);
router.get('/counterparties/:id', counterpartyController.getCounterpartyById);
router.post('/counterparties', counterpartyController.createCounterparty);
router.put('/counterparties/:id', counterpartyController.updateCounterparty);
router.delete('/counterparties/:id', counterpartyController.deleteCounterparty);

module.exports = router;
