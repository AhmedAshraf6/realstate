const express = require('express');
const router = express.Router();

const { authenticateUser } = require('../middleware/authentication');
const { uploadProfileImage } = require('../controllers/userController');

router.route('/uploadProfileImage').post(authenticateUser, uploadProfileImage);

module.exports = router;
