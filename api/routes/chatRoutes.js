const express = require('express');
const router = express.Router();
const { authenticateUser } = require('../middleware/authentication');
const { getAllChats, addNewChat } = require('../controllers/chatController');

router
  .route('/')
  .get(authenticateUser, getAllChats)
  .post(authenticateUser, addNewChat);

module.exports = router;
