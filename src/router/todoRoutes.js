import { Router } from 'express';
import getAllTodos, {
  addTodo,
  markBookmark,
  markDeleted,
  markDone,
  markFavourite,
  markImportant,
} from './todoHandlers.js';
import verifyToken from '../Validations/user.validator.js';
import {
  bookmarkValidator, deletedValidator,
  doneValidator,
  favouriteValidator,
  importantValidator, todoIdValidator,
  todoValidator,
// eslint-disable-next-line import/extensions
} from '../Validations/todo.validator.js';

const router = Router();

router.get(
  '/allTodos',
  verifyToken,
  getAllTodos,
);

router.post(
  '/addTodos',
  todoValidator,
  doneValidator,
  bookmarkValidator,
  importantValidator,
  favouriteValidator,
  deletedValidator,
  verifyToken,
  addTodo,
);

router.post(
  '/markBookmark',
  todoIdValidator,
  verifyToken,
  markBookmark,
);

router.post(
  '/markFavourite',
  todoIdValidator,
  verifyToken,
  markFavourite,
);

router.post(
  '/markImportant',
  todoIdValidator,
  verifyToken,
  markImportant,
);

router.post(
  '/markDeleted',
  todoIdValidator,
  verifyToken,
  markDeleted,
);

router.post(
  '/markDone',
  todoIdValidator,
  verifyToken,
  markDone,
);

export default router;
