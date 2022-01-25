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
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    targetTodo = await Todo.findOne({ todoId }).session(session);
    if (!targetTodo) {
      return res.status(500).json({ message: 'Could not find the todo' });
    }
    targetTodo.isBookmark = !targetTodo.isBookmark;
    await targetTodo.save();
    await session.commitTransaction();
  } catch (err) {
    await session.abortTransaction();
    return res.status(400).json({ message: 'Could not mark as bookmark' });
  } finally {
    await session.endSession();
  }
  return res.json({ message: 'success', todo: targetTodo });
}

export async function markFavourite(req, res) {
  const { todoId } = req.body;
  let targetTodo;
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    targetTodo = await Todo.findOne({ todoId }).session(session);
    if (!targetTodo) {
      return res.status(500).json({ message: 'Could not find the todo' });
    }
    targetTodo.isFavourite = !targetTodo.isFavourite;
    await targetTodo.save();
    await session.commitTransaction();
  } catch (err) {
    await session.abortTransaction();
    return res.status(400).json({ message: 'Could not mark as favourite' });
  } finally {
    await session.endSession();
  }
  return res.json({ message: 'success', todo: targetTodo });
}

export async function markImportant(req, res) {
  const { todoId } = req.body;
  let targetTodo;
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    targetTodo = await Todo.findOne({ todoId }).session(session);
    if (!targetTodo) {
      return res.status(500).json({ message: 'Could not find the todo' });
    }
    targetTodo.isImportant = !targetTodo.isImportant;
    await targetTodo.save();
    await session.commitTransaction();
  } catch (err) {
    await session.abortTransaction();
    return res.status(400).json({ message: 'Could not mark as important' });
  } finally {
    await session.endSession();
  }
  return res.json({ message: 'success', todo: targetTodo });
}

export async function markDeleted(req, res) {
  const { todoId } = req.body;
  let targetTodo;
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    targetTodo = await Todo.findOne({ todoId }).session(session);
    if (!targetTodo) {
      return res.status(500).json({ message: 'Could not find the todo' });
    }
    targetTodo.isDeleted = !targetTodo.isDeleted;
    await targetTodo.save();
    await session.commitTransaction();
  } catch (err) {
    await session.abortTransaction();
    return res.status(400).json({ message: 'Could not mark as deleted' });
  } finally {
    await session.endSession();
  }
  return res.json({ message: 'success', todo: targetTodo });
}

export async function markDone(req, res) {
  const { todoId } = req.body;
  let targetTodo;
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    targetTodo = await Todo.findOne({ todoId }).session(session);
    if (!targetTodo) {
      return res.status(500).json({ message: 'Could not find the todo' });
    }
    targetTodo.isDone = !targetTodo.isDone;
    await targetTodo.save();
    await session.commitTransaction();
  } catch (err) {
    await session.abortTransaction();
    return res.status(400).json({ message: 'Could not mark as Done' });
  } finally {
    await session.endSession();
  }
  return res.json({ message: 'success', todo: targetTodo });
}

export async function deleteTodo(req, res) {
  const { todoId } = req.body;
  let targetTodo;
  let user;
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    targetTodo = await Todo.findOneAndDelete({ todoId }).session(session);
    if (!targetTodo) {
      return res.status(500).json({ message: 'Could not find the todo' });
    }
    user = await User.findOne({ email: req.user.email }).session(session);
    if (!user) {
      return res.status(500).json({ message: 'Something went wrong while deleting the todo, Please try again' });
    }
    // eslint-disable-next-line no-underscore-dangle
    user.todos = user.todos.filter((todo) => !(todo._id.equals(targetTodo._id)));
    await user.save();
    await session.commitTransaction();
  } catch (err) {
    console.log(err);
    await session.abortTransaction();
    return res.status(400).json({ message: 'Could not delete the todo' });
  } finally {
    await session.endSession();
  }
  return res.json({ message: 'success' });
}
