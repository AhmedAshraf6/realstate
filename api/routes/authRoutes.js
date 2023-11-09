const express = require('express');
const { signIn, signUp } = require('../controllers/authController');
const router = express.Router();

router.route('/signIn').post(signIn);
router.route('/signUp').post(signUp);
module.exports = router;
