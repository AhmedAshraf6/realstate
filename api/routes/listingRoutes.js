const express = require('express');
const router = express.Router();

const { authenticateUser } = require('../middleware/authentication');
const {
  createListing,
  uploadListingImages,
  getUserLists,
  deleteListing,
} = require('../controllers/listingController');

router.route('/').post(authenticateUser, createListing);

router.route('/getUserLists').get(authenticateUser, getUserLists);
router
  .route('/uploadListingImages')
  .post(authenticateUser, uploadListingImages);

router.route('/:id').delete(authenticateUser, deleteListing);

module.exports = router;
