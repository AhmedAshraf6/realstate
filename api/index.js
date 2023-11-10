require('dotenv').config();
require('express-async-errors');

const express = require('express');
const app = express();
const cors = require('cors');

// Connect db
const connectDB = require('./db/connectDB');

// error handler
const notFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');

// Routes
const userRouter = require('./routes/userRoutes');
const authRouter = require('./routes/authRoutes');

// cors
app.use(cors());

// Middilwares
app.use(express.json());
app.use('/api/v1/user', userRouter);
app.use('/api/v1/auth', authRouter);
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

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
