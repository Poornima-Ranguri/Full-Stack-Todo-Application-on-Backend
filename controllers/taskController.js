const Task = require("../models/Task");

exports.createTask = async (req, res) => {
  try {
    const { title, status } = req.body;
    const task = await Task.create(req.user.id, title, status);
    res.status(201).json(task);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getTasks = async (req, res) => {
  try {
    const tasks = await Task.getAll(req.user.id);
    res.json(tasks);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.updateTask = async (req, res) => {
  try {
    const { id, title, status } = req.body;
    await Task.update(id, title, status);
    res.json({ message: "Task updated" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.deleteTask = async (req, res) => {
  try {
    await Task.delete(req.params.id);
    res.json({ message: "Task deleted" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
