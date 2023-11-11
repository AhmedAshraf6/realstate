const express = require('express');
const router = express.Router();

const { authenticateUser } = require('../middleware/authentication');
const { createListing } = require('../controllers/listingController');

router.route('/').post(authenticateUser, createListing);

module.exports = router;
