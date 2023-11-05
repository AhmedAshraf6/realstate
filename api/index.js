const express = require('express');
const app = express();
const connectDB = require('./db/connectDB');
const dotenv = require('dotenv');
dotenv.config();

app.get('/', (req, res) => {
  res.send('Hello World!');
});

const port = process.env.PORT || 5000;
const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () => {
      console.log(`listen ahmed to port ${port}`);
    });
  } catch (error) {
    console.log(error);
  }
};
start();
