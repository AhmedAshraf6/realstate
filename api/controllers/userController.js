const User = require('../models/User');
const { StatusCodes } = require('http-status-codes');
const path = require('path');
const { BadRequestError } = require('../errors');

const uploadProfileImage = async (req, res) => {
  if (!req.files) {
    throw new CustomError.BadRequestError('No File Uploaded');
  }
  const productImage = req.files.image;

  if (!productImage.mimetype.startsWith('image')) {
    throw new CustomError.BadRequestError('Please Upload image');
  }
  const imagePath = path.join(
    __dirname,
    '../public/uploads/' + `${productImage.name}`
  );
  await productImage.mv(imagePath);
  return res
    .status(StatusCodes.OK)
    .json({ image: { src: `/uploads/${productImage.name}` } });
};

module.exports = {
  uploadProfileImage,
};
