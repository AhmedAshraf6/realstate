const express = require('express');
const router = express.Router();

const { authenticateUser } = require('../middleware/authentication');
const {
  createListing,
  uploadListingImages,
  getUserLists,
  deleteListing,
  updateListing,
  getSingleList,
  getAllLists,
} = require('../controllers/listingController');

router.route('/').post(authenticateUser, createListing).get(getAllLists);

router.route('/getUserLists').get(authenticateUser, getUserLists);
router
  .route('/uploadListingImages')
  .post(authenticateUser, uploadListingImages);

router
  .route('/:id')
  .delete(authenticateUser, deleteListing)
  .patch(authenticateUser, updateListing)
  .get(getSingleList);

module.exports = router;
