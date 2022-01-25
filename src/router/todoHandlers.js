import { validationResult } from 'express-validator';
import mongoose from 'mongoose';
import User from '../db/schema/user.schema.js';
import Todo from '../db/schema/todo.schema.js';

export default async function getAllTodos(req, res) {
  const session = await mongoose.startSession();
  let user;
  let todos = [];
  session.startTransaction();
  try {
    user = await User.findOne({ email: req.user.email }).session(session);
    if (!user) {
      return res.status(500).json({ message: 'Something went wrong while fetching the todos, Please try again' });
    }
    todos = await Todo.find({ _id: user.todos }) || [];
  } catch (err) {
    // eslint-disable-next-line no-console
    console.log(err);
    await session.abortTransaction();
  } finally {
    await session.endSession();
  }
  return res.json({ message: 'success', todos });
}

export async function addTodo(req, res) {
  const {
    item, isBookmark, isImportant, isFavourite, isDone,
  } = req.body;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const errMap = errors.mapped();
    return res.status(400).json({ message: 'Please provide all the required fields', err: errMap });
  }
  const newTodo = {
    item, isFavourite, isBookmark, isDone, isImportant,
  };
  const session = await mongoose.startSession();
  let user;
  let todo;
  session.startTransaction();
  try {
    user = await User.findOne({ email: req.user.email }).session(session);
    if (!user) {
      return res.status(500).json({ message: 'Something went wrong while adding the todo, Please try again' });
    }
    todo = await new Todo(newTodo);
    user.todos.push(todo.id);
    await user.save();
    await todo.save();
    await session.commitTransaction();
  } catch (e) {
    // eslint-disable-next-line no-console
    console.log(e);
    await session.abortTransaction();
    return res.sendStatus(400);
  } finally {
    await session.endSession();
  }
  return res.status(202).json({ message: 'success', todo });
}

export async function markBookmark(req, res) {
  const { todoId } = req.body;
  let targetTodo;
  try {
    targetTodo = await Todo.findOne({ todoId });
    targetTodo.isBookmark = !targetTodo.isBookmark;
    await targetTodo.save();
  } catch (err) {
    return res.status(400).json({ message: 'Could not mark as bookmark' });
  }
  return res.json({ message: 'success', todo: targetTodo });
}

export async function markFavourite(req, res) {
  const { todoId } = req.body;
  let targetTodo;
  try {
    targetTodo = await Todo.findOne({ todoId });
    targetTodo.isFavourite = !targetTodo.isFavourite;
    await targetTodo.save();
  } catch (err) {
    return res.status(400).json({ message: 'Could not mark as favourite' });
  }
  return res.json({ message: 'success', todo: targetTodo });
}

export async function markImportant(req, res) {
  const { todoId } = req.body;
  let targetTodo;
  try {
    targetTodo = await Todo.findOne({ todoId });
    targetTodo.isImportant = !targetTodo.isImportant;
    await targetTodo.save();
  } catch (err) {
    return res.status(400).json({ message: 'Could not mark as important' });
  }
  return res.json({ message: 'success', todo: targetTodo });
}

export async function markDeleted(req, res) {
  const { todoId } = req.body;
  let targetTodo;
  try {
    targetTodo = await Todo.findOne({ todoId });
    targetTodo.isDeleted = !targetTodo.isDeleted;
    await targetTodo.save();
  } catch (err) {
    return res.status(400).json({ message: 'Could not mark as important' });
  }
  return res.json({ message: 'success', todo: targetTodo });
}

export async function markDone(req, res) {
  const { todoId } = req.body;
  let targetTodo;
  try {
    targetTodo = await Todo.findOne({ todoId });
    targetTodo.isDone = !targetTodo.isDone;
    await targetTodo.save();
  } catch (err) {
    return res.status(400).json({ message: 'Could not mark as important' });
  }
  return res.json({ message: 'success', todo: targetTodo });
}
