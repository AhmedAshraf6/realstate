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
  const { text, attachments } = req.body;
  if (!text && attachments?.length === 0) {
    throw new CustomError.BadRequestError('please provide data');
  }
  const selectedChat = await Chat.findById(chatId);
  if (!selectedChat) {
    throw new CustomError.NotFoundError('Chat does not exist');
  }
  const message = await Message.create({
    sender: userId,
    text,
    attachments,
    chatId: chatId,
  });
  await Chat.findByIdAndUpdate(chatId, {
    lastMessage: message._id,
  });

  res.status(StatusCodes.OK).json({ message });
};

module.exports = {
  getAllMessages,
  sendMessage,
};
