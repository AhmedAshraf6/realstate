require('dotenv').config();
require('express-async-errors');

const express = require('express');
const app = express();
const path = require('path');
const http = require('http');
const socketIO = require('socket.io');
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
const server = http.createServer(app);
const io = socketIO(server, {
  cors: {
    origin: 'https://realstate-lake.vercel.app',
  },
});
let users = [];

// add user
const addUser = (userId, socketId) => {
  !users.some((user) => user.userId === userId) &&
    users.push({ userId, socketId });
};

// get user
const getUser = (userId) => {
  return users.find((user) => user.userId === userId);
};

// remove user
const removeUser = (socketId) => {
  users = users.filter((user) => user.socketId !== socketId);
};
io.on('connection', (socket) => {
  console.log(`user connected`);

  // take user id and socket id from client
  socket.on('addUser', (userId) => {
    addUser(userId, socket.id);
  });

  socket.emit('users', {
    users,
  });

  // Send and get Messages
  socket.on('sendMessage', ({ senderId, receiverId, text, images, chatId }) => {
    const user = getUser(receiverId);
    if (!user) return;
    io.to(user.socketId).emit('getMessage', {
      senderId,
      text,
      chatId,
      attachments: images,
    });
    io.to(user.socketId).emit('getNotification', {
      senderId,
      text,
      chatId,
    });
  });

  socket.on('addChat', ({ sender, receiverId, _id }) => {
    const user = getUser(receiverId);
    if (!user) return;
    io.to(user.socketId).emit('newChat', {
      _id,
      members: [{ ...sender }],
      lastMessage: {
        test: '',
      },
    });
  });

  // when disconnect
  socket.on('disconnect', (userId) => {
    console.log('disconnected');
    removeUser(socket.id);
  });
});

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    server.listen(port, () => {
      console.log(`listen ahmed to port ${port}`);
    });
  } catch (error) {
    console.log(error);
  }
};
start();
