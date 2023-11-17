const express = require('express');
const router = express.Router();
const { authenticateUser } = require('../middleware/authentication');
const {
  getAllMessages,
  sendMessage,
} = require('../controllers/messageController');

router
  .route('/:chatId')
  .get(authenticateUser, getAllMessages)
  .post(authenticateUser, sendMessage);

module.exports = router;
