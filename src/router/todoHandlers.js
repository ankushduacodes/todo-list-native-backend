import { validationResult } from 'express-validator';
import mongoose from 'mongoose';
// eslint-disable-next-line import/extensions
import User from '../db/schema/user.schema.js';
// eslint-disable-next-line import/extensions
import Todo from '../db/schema/todo.schema.js';

export default async function getAllTodos(req, res) {
  const session = await mongoose.startSession();
  let user;
  let todos = [];
  session.startTransaction();
  try {
    user = await User.findOne({ email: req.user.email }).session(session);
    if (!user) {
      return res.status(500).json({ message: 'Something went wrong while adding the todo, Please try again' });
    }
    todos = await Todo.findById(user.todos) || [];
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
    // eslint-disable-next-line no-unused-vars
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
