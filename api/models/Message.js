const mongoose = require('mongoose');

const MessageSchema = new mongoose.Schema(
  {
    sender: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
    },
    text: {
      type: String,
    },
    attachments: {
      type: [String],
      default: [],
    },
    chatId: {
      type: mongoose.Schema.ObjectId,
      ref: 'Chat',
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Message', MessageSchema);
