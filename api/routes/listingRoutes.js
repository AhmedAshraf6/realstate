const express = require('express');
const router = express.Router();

const { authenticateUser } = require('../middleware/authentication');
const {
  createListing,
  uploadListingImages,
} = require('../controllers/listingController');

router.route('/').post(authenticateUser, createListing);
router
  .route('/uploadListingImages')
  .post(authenticateUser, uploadListingImages);

module.exports = router;
