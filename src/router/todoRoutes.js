import { Router } from 'express';
// eslint-disable-next-line import/extensions
import getAllTodos, { addTodo } from './todoHandlers.js';
// eslint-disable-next-line import/extensions
import verifyToken from '../Validations/user.validator.js';
import {
  bookmarkValidator,
  doneValidator,
  favouriteValidator,
  importantValidator,
  todoValidator,
// eslint-disable-next-line import/extensions
} from '../Validations/todo.validator.js';

const router = Router();

router.get('/allTodos', verifyToken, getAllTodos);
router.post('/addTodos', todoValidator, doneValidator, bookmarkValidator, importantValidator, favouriteValidator, verifyToken, addTodo);

export default router;
