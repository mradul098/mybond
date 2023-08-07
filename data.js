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
