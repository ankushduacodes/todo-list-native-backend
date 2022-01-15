import { Router } from 'express';
// eslint-disable-next-line import/extensions
import loginHandler, { registerHandler } from './userHandlers.js';

const router = Router();

router.post('/login', loginHandler);

router.post('/register', registerHandler);

export default router;
