const db = require('../config/connection');

const getAllTasks = () => {
  return db('tasks').select('*');
};

const getTaskById = (id) => {
  return db('tasks').where({ id }).first();
};

const createTask = (taskData) => {
  return db('tasks').insert(taskData);
};

const updateTask = (id, taskData) => {
  return db('tasks').where({ id }).update(taskData);
};

const deleteTask = (id) => {
  return db('tasks').where({ id }).del();
};

module.exports = {
  getAllTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask
};
