// const mongoose = require('mongoose');
// const autoPopulate = require('mongoose-autopopulate');
// const faker = require('faker');
// const env=require('dotenv/config');

// // Connect to your MongoDB database
// mongoose.connect(process.env.MONGODB_URL, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// })

//   .then(() => {
//     console.log('Connected to database');
//   })
//   .catch((err) => {
//     console.error('Error connecting to database:', err);
//   });

// // // Define your MongoDB schema
// // const bookSchema = new mongoose.Schema({
// //   BookName: String,
// // });

// // const userSchema = new mongoose.Schema({
// //   Name: String,
// //   Email: String,
// //   Role: String,
// // });

// // const counterpartySchema = new mongoose.Schema({
// //   Name: String,
// // });

// // const securitySchema = new mongoose.Schema({
// //   ISIN: String,
// //   CUSIP: String,
// //   Issuer: String,
// //   MaturityDate: Date,
// //   Coupon: Number,
// //   Type: String,
// //   FaceValue: Number,
// //   Status: String,
// // });

// // const bookUserSchema = new mongoose.Schema({
// //     BookId: { type: mongoose.Schema.Types.ObjectId, ref: 'Book' },
// //     UserId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
// //   });

// // const tradeSchema = new mongoose.Schema({
// //   id: Number,
// //   CounterpartyId: { type: mongoose.Schema.Types.ObjectId, ref: 'Counterparty', autopopulate: true },
// //   SecurityId: { type: mongoose.Schema.Types.ObjectId, ref: 'Security', autopopulate: true },
// //   Quantity: Number,
// //   Status: String,
// //   Price: Number,
// //   Buy_Sell: String,
// //   TradeDate: Date,
// //   SettlementDate: Date,
// // });

// // Apply the autopopulate plugin to auto-populate the referenced documents
// // tradeSchema.plugin(autoPopulate);

// // Create your MongoDB models
// const Book = require('./models/Book');
// const User = require('./models/User');
// const Counterparty = require('./models/Counterparty');
// const Security = require('./models/Security');
// const {Trade,tradeSchema} = require('./models/Trade');
// const { BookUser,bookUserSchema}=require('./models/BookUser');

// // Function to generate fake data for each model
// const generateFakeData = (Model, count) => {
//     const fakeData = [];
//     for (let i = 1; i <= count; i++) {
//       fakeData.push(new Model({ ...faker.fake(Model.schema.obj) }));
//     }
//     return fakeData;
//   };
  
//   (async () => {
//     try {
//       // Generate fake data for each model
//       const books = generateFakeData(Book, 100);
//       const users = generateFakeData(User, 50);
//       const bookusers = generateFakeData(BookUser, 100);
//       const counterparties = generateFakeData(Counterparty, 30);
//       const securities = generateFakeData(Security, 80);
//       const trades = generateFakeData(Trade, 200);
  
//       // Insert the generated data into MongoDB
//       await Promise.all([
//         Book.insertMany(books),
//         User.insertMany(users),
//         BookUser.insertMany(bookusers),
//         Counterparty.insertMany(counterparties),
//         Security.insertMany(securities),
//         Trade.insertMany(trades),
//       ]);
  
//       console.log('Data inserted successfully.');
//       process.exit(0);
//     } catch (error) {
//       console.error('Error inserting data:', error);
//       process.exit(1);
//     }
//   })(); 

const axios = require('axios');
const faker = require('faker');
const User = require('./models/User');
const Counterparty = require('./models/Counterparty');
const Security = require('./models/Security');
const Trade = require('./models/Trade');  
const Book = require('./models/Book');
const BookUser = require('./models/BookUser');

const generateUserData = () => ({
  Name: faker.name.findName(),
  Email: faker.internet.email(),
  Role: faker.random.arrayElement(['User', 'Admin', 'Customer']),
});

const generateCounterpartyData = () => ({
  Name: faker.company.companyName(),
});

const generateSecurityData = () => ({
  ISIN: faker.random.alphaNumeric(12),
  CUSIP: faker.random.alphaNumeric(9),
  Issuer: faker.company.companyName(),
  MaturityDate: faker.date.future(),
  Coupon: faker.random.number({ min: 1, max: 10 }),
  Type: faker.random.arrayElement(['Government', 'Corporate']),
  FaceValue: faker.random.number({ min: 100, max: 1000 }),
  Status: faker.random.arrayElement(['Active', 'Inactive']),
});


const generateBookData = () => ({
  BookName: faker.random.words(2),
});



const insertSampleData = async () => {
  // try {
    // Generate and insert User data
    const user = generateUserData();
    const createdUserResponse = await axios.post('http://localhost:3000/api/users', user);
    const createdUser = createdUserResponse.data;

    // Generate and insert Counterparty data
    const counterparty = generateCounterpartyData();
    const createdCounterpartyResponse = await axios.post('http://localhost:3000/api/counterparties', counterparty);
    console.log(createdCounterpartyResponse.data);
    const createdCounterparty = createdCounterpartyResponse.data;

    // // Generate and insert Security data
    const security = generateSecurityData();
    const createdSecurityResponse = await axios.post('http://localhost:3000/api/securities', security);
    const createdSecurity = createdSecurityResponse.data;

    const generateTradeData = () => ({
      CounterpartyId: createdCounterparty._id,
      SecurityId: createdSecurity._id,
      Quantity: faker.random.number({ min: 1, max: 100 }),
      Status: faker.random.arrayElement(['Pending', 'Completed']),
      Price: faker.random.number({ min: 50, max: 200 }),
      Buy_Sell: faker.random.arrayElement(['Buy', 'Sell']),
      TradeDate: faker.date.past(),
      SettlementDate: faker.date.future(),
    });
    


    // Generate and insert Trade data
    const trade = generateTradeData();
    console.log(trade);
    const createdTradeResponse = await axios.post('http://localhost:3000/api/trades', trade);
    const createdTrade = createdTradeResponse.data;

   
    const book = generateBookData();
    const createdBookResponse = await axios.post('http://localhost:3000/api/books', book);
    const createdBook = createdBookResponse.data;

    // Create a bookUser using the generated user and book IDs
    const bookUser = await axios.post('http://localhost:3000/api/bookUsers', {
      BookId: createdBook._id,
      UserId: createdUser._id,
    });

  //   console.log('Sample data inserted successfully:', {
  //     User: createdUser,
  //     Counterparty: createdCounterparty,
  //     Security: createdSecurity,
  //     Trade: createdTrade,
  //     Book: createdBook,
  //     BookUser: bookUser.data,
  //   });
  // } catch (error) {
  //   console.error('Error inserting sample data:', error);
  // }
};

insertSampleData();
