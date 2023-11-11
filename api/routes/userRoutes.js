const express = require('express');
const router = express.Router();

const { authenticateUser } = require('../middleware/authentication');
const {
  uploadProfileImage,
  updateUser,
  deleteUser,
} = require('../controllers/userController');

router.route('/uploadProfileImage').post(authenticateUser, uploadProfileImage);
router.route('/updateUser').patch(authenticateUser, updateUser);
router.route('/deleteUser').delete(authenticateUser, deleteUser);

module.exports = router;
