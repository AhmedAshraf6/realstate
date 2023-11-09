const User = require('../models/User');
const { StatusCodes } = require('http-status-codes');
const { BadRequestError, UnauthenticatedError } = require('../errors');
const signUp = async (req, res) => {
  const { email, username, password } = req.body;
  const user = await User.create({ username, email, password });
  const token = user.createJWT();
  res.status(StatusCodes.CREATED).json({ token });
};
const signIn = async (req, res) => {
  res.send('sign in');
};
module.exports = {
  signIn,
  signUp,
};
