require('dotenv').config();
require('express-async-errors');

const express = require('express');
const app = express();
const path = require('path');

// Extra packages
const cors = require('cors');
const fileUpload = require('express-fileupload');

// Connect db
const connectDB = require('./db/connectDB');

// error handler
const notFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');

// Routes
const userRouter = require('./routes/userRoutes');
const authRouter = require('./routes/authRoutes');
const listingRouter = require('./routes/listingRoutes');
const chatRouter = require('./routes/chatRoutes');
const messageRouter = require('./routes/messageRoutes');

// extra packages
app.use(cors());

// Middilwares
app.use(express.static(path.join(__dirname, './public')));
app.use(express.json());
app.use(fileUpload());

app.use('/api/v1/user', userRouter);
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/listing', listingRouter);
app.use('/api/v1/chat', chatRouter);
app.use('/api/v1/message', messageRouter);
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
