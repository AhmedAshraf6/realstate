const { StatusCodes } = require('http-status-codes');
const CustomError = require('../errors');
const Listing = require('../models/Listing');
const createListing = async (req, res) => {
  req.body.userRef = req.user.userId;
  const listing = await Listing.create(req.body);
  res.status(StatusCodes.CREATED).json({ listing });
};
module.exports = {
  createListing,
};
