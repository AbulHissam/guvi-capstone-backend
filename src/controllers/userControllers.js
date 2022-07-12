const {
  createUser,
  updateUser,
  getUsers,
  getUserById,
  login,
  deleteUser,
} = require("../services/userService");
const AppError = require("../utils/custom-app-error");
const generateToken = require("../utils/generateJwt");

const create = async (req, res, next) => {
  try {
    const payload = req.body;
    const user = await createUser(payload);
    res.json(user);
  } catch (error) {
    next(error);
  }
};

const update = async (req, res, next) => {
  try {
    const payload = req.body;
    const { id } = req.params;
    await updateUser(id, payload);
    res.sendStatus(200);
  } catch (error) {
    next(error);
  }
};

const deleteById = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!id) throw new AppError("invalid id", 400);

    if (id === req.userId)
      throw new AppError("cannot delete current user", 400);

    await deleteUser(id);

    res.sendStatus(200);
  } catch (error) {
    next(error);
  }
};

const get = async (req, res, next) => {
  try {
    const users = await getUsers();
    res.json(users);
  } catch (error) {
    next(error);
  }
};

const getById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await getUserById(id);
    res.json(user);
  } catch (error) {
    next(error);
  }
};

const loginUser = async (req, res, next) => {
  try {
    const payload = req.body;
    const user = await login(payload);
    res.json(user);
  } catch (error) {
    next(error);
  }
};

const signupUser = async (req, res, next) => {
  try {
    const payload = req.body;
    const user = await createUser(payload);
    res.json({
      ...user,
      token: generateToken({ userId: user._id, roles: user.roles }),
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  create,
  update,
  deleteById,
  get,
  getById,
  loginUser,
  signupUser,
};
