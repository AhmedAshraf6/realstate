const { StatusCodes } = require('http-status-codes');
const CustomError = require('../errors');
const Listing = require('../models/Listing');
const path = require('path');
const checkPermissions = require('../utils/checkPermissions');
const createListing = async (req, res) => {
  req.body.userRef = req.user.userId;
  const listing = await Listing.create(req.body);
  res.status(StatusCodes.CREATED).json({ listing });
};

const uploadListingImages = async (req, res) => {
  if (!req.files) {
    throw new CustomError.BadRequestError('No File Uploaded');
  }
  const images = req.files;

  if (Object.keys(images).length > 6) {
    throw new CustomError.BadRequestError('Images must be less than 7 images');
  }
  const maxSize = 10 * 1024 * 1024;
  let tempImages = [];
  for (const image in images) {
    if (!images[image].mimetype.startsWith('image')) {
      throw new CustomError.BadRequestError('Please Upload only image');
    }
    if (images[image].size > maxSize) {
      throw new CustomError.BadRequestError(
        'Please upload image smaller than 5MB'
      );
    }
    const imagePath = path.join(
      __dirname,
      '../public/uploads/' + `${images[image].name}`
    );
    await images[image].mv(imagePath);
    tempImages = [...tempImages, `/uploads/${images[image].name}`];
  }
  return res.status(StatusCodes.OK).json({ images: tempImages });
};

const getUserLists = async (req, res) => {
  const listings = await Listing.find({ userRef: req.user.userId });
  res.status(StatusCodes.OK).json({ listings });
};
const getSingleList = async (req, res) => {
  const singleList = await Listing.findOne({ _id: req.params.id });
  if (!singleList) {
    throw new CustomError.NotFoundError(`No List with id : ${req.params.id}`);
  }
  res.status(StatusCodes.OK).json({ singleList });
};
const deleteListing = async (req, res) => {
  const { id: listId } = req.params;

  const list = await Listing.findOne({ _id: listId });

  if (!list) {
    throw new CustomError.NotFoundError(`No List with id : ${listId}`);
  }

  checkPermissions(req.user, list.userRef);
  await list.remove();
  res.status(StatusCodes.OK).json({ msg: 'Success! List removed.' });
};
const updateListing = async (req, res) => {
  const { id: listId } = req.params;
  const {
    name,
    description,
    regularPrice,
    discountedPrice,
    address,
    bathrooms,
    bedrooms,
    furnished,
    parking,
    type,
    offer,
    imageUrls,
  } = req.body;
  const list = await Listing.findOne({ _id: listId });

  if (!list) {
    throw new CustomError.NotFoundError(`No List with id : ${listId}`);
  }

  checkPermissions(req.user, list.userRef);
  list.name = name;
  list.description = description;
  list.regularPrice = regularPrice;
  list.discountedPrice = discountedPrice;
  list.address = address;
  list.bathrooms = bathrooms;
  list.bedrooms = bedrooms;
  list.furnished = furnished;
  list.parking = parking;
  list.type = type;
  list.offer = offer;
  list.imageUrls = imageUrls;

  await list.save();
  res.status(StatusCodes.OK).json({ list });
};

module.exports = {
  createListing,
  uploadListingImages,
  getUserLists,
  deleteListing,
  updateListing,
  getSingleList,
};
