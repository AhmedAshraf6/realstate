const createTokenUser = (user) => {
  return {
    username: user.username,
    email: user.email,
    userId: user._id,
    role: user.role,
    avatar: user?.avatar,
  };
};

module.exports = createTokenUser;
