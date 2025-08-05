const express = require('express');
const router = express.Router();
const Todo = require('../models/Todo');

// Get All Todos
router.get('/', async (req, res) => {
  const todos = await Todo.find();
  res.json(todos);
});

// Add a New Todo
router.post('/', async (req, res) => {
  const newTodo = new Todo({ title: req.body.title });
  const savedTodo = await newTodo.save();
  res.json(savedTodo);
});

// Update Todo
router.put('/:id', async (req, res) => {
  const updatedTodo = await Todo.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updatedTodo);
});

// Delete Todo
router.delete('/:id', async (req, res) => {
  await Todo.findByIdAndDelete(req.params.id);
  res.json({ message: 'Todo Deleted' });
});

module.exports = router;
