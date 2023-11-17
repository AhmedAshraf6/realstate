const Chat = require('../models/Chat');
const { StatusCodes } = require('http-status-codes');
const CustomError = require('../errors');
const Message = require('../models/Message');

const getAllMessages = async (req, res) => {
  const { chatId } = req.params;

  const selectedChat = await Chat.findById(chatId);

  if (!selectedChat) {
    throw new CustomError.NotFoundError('Chat does not exist');
  }
  const messages = await Message.find({ chatId }).populate({
    path: 'sender',
    select: 'username avatar',
  });
  res.status(StatusCodes.OK).json({ messages });
};
const sendMessage = async (req, res) => {
  const { chatId } = req.params;
  const { userId } = req.user;
  const { text } = req.body;
  if (!text) {
    throw new CustomError.BadRequestError('please provide text');
  }
  const selectedChat = await Chat.findById(chatId);

  if (!selectedChat) {
    throw new CustomError.NotFoundError('Chat does not exist');
  }
  const message = await Message.create({
    sender: userId,
    text,
    chatId: chatId,
  });
  res.status(StatusCodes.OK).json({ message });
};

module.exports = {
  getAllMessages,
  sendMessage,
};
