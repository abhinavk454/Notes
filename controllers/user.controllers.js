const User = require("../models/user.models");

exports.createUser = (userData) => {
  const user = new User(userData);
  return user.save();
};
