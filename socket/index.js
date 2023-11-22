const io = require('socket.io')(8900, {
  cors: {
    origin: 'http://localhost:3000',
  },
});
// to send
// io.emit() => for everyone
// io.to(socketid).emtit() specific one
// to receive
// socket.on();
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
