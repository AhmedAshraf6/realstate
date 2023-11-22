const mongoose = require('mongoose');

const ChatSchema = new mongoose.Schema(
  {
    members: [
      {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
      },
    ],
    lastMessage: {
      type: mongoose.Schema.ObjectId,
      ref: 'Message',
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Chat', ChatSchema);
