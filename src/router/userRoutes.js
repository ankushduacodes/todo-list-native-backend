import { Router } from 'express';
// eslint-disable-next-line import/extensions
import loginHandler, { registerHandler } from './userHandlers.js';
import {
  emailValidator,
  firstNameValidator,
  lastNameValidator,
  passwordValidator,
// eslint-disable-next-line import/extensions
} from '../Validations/user.validator.js';

const router = Router();

router.post('/login', emailValidator, loginHandler);

router.post('/register', firstNameValidator, lastNameValidator, emailValidator, passwordValidator, registerHandler);

export default router;
