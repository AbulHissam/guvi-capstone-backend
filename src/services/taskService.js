const Task = require("../models/taskModel");

const excludeFields = {
  __v: 0,
};

const createTask = async (payload, userId) => {
  payload = {
    ...payload,
    createdBy: userId,
    updatedBy: userId,
  };
  const task = await (
    await Task.create(payload)
  ).populate("createdBy", "email firstname lastname");
  return task;
};

const updateTask = async (taskId, payload, userId) => {
  payload = {
    ...payload,
    updatedBy: userId,
  };
  await Task.findByIdAndUpdate(taskId, payload);
};

const deleteTask = async (taskId) => {
  await Task.findByIdAndDelete(taskId);
};

const getTasks = async () => {
  const tasks = await Task.find({}, excludeFields).populate(
    "createdBy updatedBy",
    "email firstname lastname"
  );
  return tasks;
};

const getTaskById = async (taskId) => {
  const task = await Task.findById(taskId, excludeFields).populate(
    "createdBy updatedBy",
    "email firstname lastname"
  );
  return task;
};

module.exports = { createTask, updateTask, deleteTask, getTasks, getTaskById };
