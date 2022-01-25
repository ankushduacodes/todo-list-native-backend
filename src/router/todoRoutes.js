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
  importantValidator,
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
  verifyToken,
  markBookmark,
);

router.post(
  '/markFavourite',
  verifyToken,
  markFavourite,
);

router.post(
  '/markImportant',
  verifyToken,
  markImportant,
);

router.post(
  '/markDeleted',
  verifyToken,
  markDeleted,
);

router.post(
  '/markDone',
  verifyToken,
  markDone,
);

export default router;
