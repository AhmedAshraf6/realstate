const User = require('../models/User');
const { StatusCodes } = require('http-status-codes');
const path = require('path');
const CustomError = require('../errors');
const createTokenUser = require('../utils/createTokenUser');
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
const updateUser = async (req, res) => {
  const { email, username, avatar } = req.body;
  if (!email || !username || !avatar) {
    throw new CustomError.BadRequestError('Please provide all values');
  }
  const user = await User.findOneAndUpdate(
    { _id: req.user.userId },
    {
      email,
      username,
      avatar,
    },
    {
      new: true,
      runValidators: true,
    }
  );

  const tokenUser = createTokenUser(user);
  res.status(StatusCodes.OK).json({ user: tokenUser });
};
module.exports = {
  uploadProfileImage,
  updateUser,
};
