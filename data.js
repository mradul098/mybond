const mongoose = require('mongoose');
const autoPopulate = require('mongoose-autopopulate');
const faker = require('faker');
const env=require('dotenv/config');

// Connect to your MongoDB database
mongoose.connect(process.env.MONGODB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

  .then(() => {
    console.log('Connected to database');
  })
  .catch((err) => {
    console.error('Error connecting to database:', err);
  });

// // Define your MongoDB schema
// const bookSchema = new mongoose.Schema({
//   BookName: String,
// });

// const userSchema = new mongoose.Schema({
//   Name: String,
//   Email: String,
//   Role: String,
// });

// const counterpartySchema = new mongoose.Schema({
//   Name: String,
// });

// const securitySchema = new mongoose.Schema({
//   ISIN: String,
//   CUSIP: String,
//   Issuer: String,
//   MaturityDate: Date,
//   Coupon: Number,
//   Type: String,
//   FaceValue: Number,
//   Status: String,
// });

// const bookUserSchema = new mongoose.Schema({
//     BookId: { type: mongoose.Schema.Types.ObjectId, ref: 'Book' },
//     UserId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
//   });

// const tradeSchema = new mongoose.Schema({
//   id: Number,
//   CounterpartyId: { type: mongoose.Schema.Types.ObjectId, ref: 'Counterparty', autopopulate: true },
//   SecurityId: { type: mongoose.Schema.Types.ObjectId, ref: 'Security', autopopulate: true },
//   Quantity: Number,
//   Status: String,
//   Price: Number,
//   Buy_Sell: String,
//   TradeDate: Date,
//   SettlementDate: Date,
// });

// Apply the autopopulate plugin to auto-populate the referenced documents
// tradeSchema.plugin(autoPopulate);

// Create your MongoDB models
const Book = require('./models/Book');
const User = require('./models/User');
const Counterparty = require('./models/Counterparty');
const Security = require('./models/Security');
const {Trade,tradeSchema} = require('./models/Trade');
const { BookUser,bookUserSchema}=require('./models/BookUser');

// Function to generate fake data for each model
const generateFakeData = (Model, count) => {
    const fakeData = [];
    for (let i = 1; i <= count; i++) {
      fakeData.push(new Model({ ...faker.fake(Model.schema.obj) }));
    }
    return fakeData;
  };
  
  (async () => {
    try {
      // Generate fake data for each model
      const books = generateFakeData(Book, 100);
      const users = generateFakeData(User, 50);
      const bookusers = generateFakeData(BookUser, 100);
      const counterparties = generateFakeData(Counterparty, 30);
      const securities = generateFakeData(Security, 80);
      const trades = generateFakeData(Trade, 200);
  
      // Insert the generated data into MongoDB
      await Promise.all([
        Book.insertMany(books),
        User.insertMany(users),
        BookUser.insertMany(bookusers),
        Counterparty.insertMany(counterparties),
        Security.insertMany(securities),
        Trade.insertMany(trades),
      ]);
  
      console.log('Data inserted successfully.');
      process.exit(0);
    } catch (error) {
      console.error('Error inserting data:', error);
      process.exit(1);
    }
  })();  