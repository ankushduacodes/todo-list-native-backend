import { Router } from 'express';
// eslint-disable-next-line import/extensions
import getAllTodos from './todoHandlers.js';
// eslint-disable-next-line import/extensions
import verifyToken from '../Validations/user.validator.js';

const router = Router();

router.get('/allTodos', verifyToken, getAllTodos);

export default router;
