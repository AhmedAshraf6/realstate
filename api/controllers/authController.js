const User = require('../models/User');
const { StatusCodes } = require('http-status-codes');
const { BadRequestError, UnauthenticatedError } = require('../errors');
const createTokenUser = require('../utils/createTokenUser');
const signUp = async (req, res) => {
  const { email, username, password } = req.body;
  const user = await User.create({ username, email, password });
  const token = user.createJWT();
  const tokenUser = createTokenUser(user);
  res.status(StatusCodes.CREATED).json({ user: tokenUser, token });
};
const signIn = async (req, res) => {
  const { email, password } = req.body;
  if ((!email, !password)) {
    throw new BadRequestError('Please provide email and password');
  }
  const user = await User.findOne({ email });
  if (!user) {
    throw new UnauthenticatedError('Invalid credentials');
  }
  // copare password
  const isPasswordCorrect = await user.comparePassword(password);
  if (!isPasswordCorrect) {
    throw new UnauthenticatedError('Invalid credentials');
  }
  const token = user.createJWT();
  const tokenUser = createTokenUser(user);
  res.status(StatusCodes.CREATED).json({ user: tokenUser, token });
};
const google = async (req, res) => {
  const { displayName, email, photoURL } = req.body;
  if (!email) {
    throw new BadRequestError('Please provide email');
  }
  const user = await User.findOne({ email });
  if (user) {
    const token = user.createJWT();
    const tokenUser = createTokenUser(user);
    res.status(StatusCodes.CREATED).json({ user: tokenUser, token });
  } else {
    const generatedPassword =
      Math.random().toString(36).slice(-8) +
      Math.random().toString(36).slice(-8);
    const user = await User.create({
      username:
        displayName.split(' ').join('').toLowerCase() +
        Math.random().toString(36).slice(-4),
      email,
      password: generatedPassword,
      avatar: photoURL,
    });
    const token = user.createJWT();
    const tokenUser = createTokenUser(user);
    res.status(StatusCodes.CREATED).json({ user: tokenUser, token });
  }
};
module.exports = {
  signIn,
  signUp,
  google,
};
