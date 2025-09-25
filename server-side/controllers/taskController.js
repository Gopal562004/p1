const Task = require("../models/Task.model");

// Create Task
const createTask = async (req, res, next) => {
  try {
    const { title, description, status } = req.body;
    const task = await Task.create({
      title,
      description,
      status,
      owner: req.user._id,
    });
    res.status(201).json(task);
  } catch (error) {
    next(error);
  }
};

// Get all tasks
const getTasks = async (req, res, next) => {
  try {
    const filter = req.user.role === "admin" ? {} : { owner: req.user._id };
    const tasks = await Task.find(filter).populate("owner", "name email");
    res.json(tasks);
  } catch (error) {
    next(error);
  }
};

// Get single task
const getTask = async (req, res, next) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ message: "Task not found" });
    if (
      req.user.role !== "admin" &&
      task.owner.toString() !== req.user._id.toString()
    ) {
      return res.status(403).json({ message: "Forbidden" });
    }
    res.json(task);
  } catch (error) {
    next(error);
  }
};

// Update Task
const updateTask = async (req, res, next) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ message: "Task not found" });
    if (
      req.user.role !== "admin" &&
      task.owner.toString() !== req.user._id.toString()
    ) {
      return res.status(403).json({ message: "Forbidden" });
    }
    Object.assign(task, req.body);
    await task.save();
    res.json(task);
  } catch (error) {
    next(error);
  }
};

// Delete Task
const deleteTask = async (req, res, next) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ message: "Task not found" });
    if (
      req.user.role !== "admin" &&
      task.owner.toString() !== req.user._id.toString()
    ) {
      return res.status(403).json({ message: "Forbidden" });
    }
    await task.remove();
    res.json({ message: "Task deleted" });
  } catch (error) {
    next(error);
  }
};

module.exports = { createTask, getTasks, getTask, updateTask, deleteTask };
