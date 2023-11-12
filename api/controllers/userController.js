const User = require('../models/User');
const { StatusCodes } = require('http-status-codes');
const CustomError = require('../errors');
const createTokenUser = require('../utils/createTokenUser');

const path = require('path');

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

  const user = await User.findById(req.user.userId);
  if (!user) {
    throw new CustomError.NotFoundError('User not exists');
  }
  user.email = email;
  user.username = username;
  user.avatar = avatar;
  user.save();
  const tokenUser = createTokenUser(user);
  res.status(StatusCodes.OK).json({ user: tokenUser });
};

const deleteUser = async (req, res) => {
  const user = await User.findOne({ _id: req.user.userId });
  if (!user) {
    throw new CustomError.NotFoundError('User not exists');
  }
  user.remove();
  res.status(StatusCodes.OK).json({ msg: 'deleted success' });
};

module.exports = {
  uploadProfileImage,
  updateUser,
  deleteUser,
};
