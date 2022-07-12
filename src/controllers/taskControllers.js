const AppError = require("../utils/custom-app-error");
const {
  createTask,
  updateTask,
  getTasks,
  getTaskById,
  deleteTask,
} = require("../services/taskService");

const get = async (req, res, next) => {
  try {
    const tasks = await getTasks();
    res.json(tasks);
  } catch (error) {
    next(error);
  }
};

const getById = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!id) throw new AppError("invalid id", 400);

    const task = await getTaskById(id);

    res.json(task);
  } catch (error) {
    next(error);
  }
};

const create = async (req, res, next) => {
  try {
    const payload = req.body;
    const { userId } = req;

    const { title } = payload;
    if (!title) throw new AppError("task title is required", 400);

    const task = await createTask(payload, userId);

    res.json(task);
  } catch (error) {
    next(err);
  }
};

const update = async (req, res, next) => {
  try {
    const payload = req.body;
    const { userId } = req;

    const { id } = req.params;
    if (!id) throw new AppError("task id is not present", 400);

    await updateTask(id, payload, userId);

    res.sendStatus(200);
  } catch (error) {
    next(err);
  }
};

const deleteById = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!id) throw new AppError("invalid id", 400);

    await deleteTask(id);

    res.sendStatus(200);
  } catch (error) {
    next(error);
  }
};

module.exports = { get, getById, create, update, deleteById };
