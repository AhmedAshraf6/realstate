require('dotenv').config();
const mockData = require('./moc-data.json');
const Listing = require('./models/Listing');
const connectDB = require('./db/connectDB');

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    await Listing.create(mockData);
    console.log('Success !!!');
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

start();
