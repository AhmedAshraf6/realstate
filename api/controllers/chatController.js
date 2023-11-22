const Chat = require('../models/Chat');
const { StatusCodes } = require('http-status-codes');
const CustomError = require('../errors');

const User = require('../models/User');

const getAllChats = async (req, res) => {
  const chats = await Chat.find({
    members: { $in: [req.user.userId] },
  })
    .sort('-updatedAt')
    .populate({
      path: 'members',
      select: 'username avatar',
    })
    .populate({
      path: 'lastMessage',
      select: 'text sender chatId attachments',
    });
  res.status(StatusCodes.OK).json({ chats });
};
const addNewChat = async (req, res) => {
  const { receiverId } = req.body;
  const { userId } = req.user;
  const isThisIdExist = await User.findOne({ _id: receiverId });
  if (!isThisIdExist) {
    throw new CustomError.NotFoundError(`user not exist : ${receiverId}`);
  }
  if (userId.toString() === receiverId.toString()) {
    throw new CustomError.BadRequestError("You Can't add yourself");
  }
  const chat = await Chat.findOne({
    members: { $all: [userId, receiverId] },
  }).populate({
    path: 'members',
    select: 'username avatar',
  });
  if (chat) {
    res.status(StatusCodes.OK).json({ chat });
  } else {
    const newChat = await Chat.create({
      members: [userId, receiverId],
    });
    const tempNewChat = await Chat.findOne({
      members: { $all: [userId, receiverId] },
    }).populate({
      path: 'members',
      select: 'username avatar',
    });
    res.status(StatusCodes.OK).json({ chat: tempNewChat });
  }
};
module.exports = {
  getAllChats,
  addNewChat,
};
