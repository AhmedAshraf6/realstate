const express = require('express');
const { signIn, signUp, google } = require('../controllers/authController');
const router = express.Router();

router.route('/signIn').post(signIn);
router.route('/signUp').post(signUp);
router.route('/google').post(google);
module.exports = router;
