const AppError = require("../utils/custom-app-error");
const User = require("../models/userModel");
const generateToken = require("../utils/generateJwt");

const excludeFields = {
  password: 0,
  createdAt: 0,
  updatedAt: 0,
  __v: 0,
};

const createUser = async (payload) => {
  const { firstname, lastname, email, password, roles } = payload;

  if (roles) throw new AppError("roles should not be part of this payload");

  if (!email || !password || !firstname)
    throw new AppError("email or password or firstname is missing", 400);

  const userExists = await User.findOne({ email });
  if (userExists) throw new AppError("user already exists", 400);

  const user = await User.create({ firstname, lastname, email, password });

  return {
    _id: user._id,
    email: user.email,
    firstname: user.firstname,
    lastname: user.lastname,
  };
};

const updateUser = async (userId, payload) => {
  const user = await User.findById(userId);

  if (!user) throw new AppError("invalid user id", 400);

  // const roles = user.roles.filter((role) => {
  //   !payload.roles.includes(role);
  // });

  // const toUpdatePaylod = {
  //   ...payload,
  //   roles: [...payload.roles, ...roles],
  // };

  await User.findByIdAndUpdate(userId, payload);

  // return updatedUser;
};

const getUsers = async () => {
  const users = await User.find({}, excludeFields);
  return users;
};

const getUserById = async (userId) => {
  const user = await User.findById(userId, excludeFields);
  if (!user) throw new AppError("user not found", 404);
  return user;
};

const login = async (payload) => {
  const { email, password } = payload;
  if (!email || !password)
    throw new AppError("email or password is missing", 400);

  const user = await User.findOne({ email });
  if (!user) throw new AppError("user not found", 404);

  const passwordMatches = await user.checkPassword(password);
  if (!passwordMatches) throw new AppError("invalid password", 400);

  return {
    _id: user._id,
    email: user.email,
    firstname: user.firstname,
    lastname: user.lastname,
    token: generateToken({ userId: user._id, roles: user.roles }),
  };
};

module.exports = {
  createUser,
  updateUser,
  getUsers,
  getUserById,
  login,
};
