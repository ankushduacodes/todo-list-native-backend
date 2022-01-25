import { check } from 'express-validator';

export const todoValidator = check('item').trim().escape().notEmpty();
export const doneValidator = check('isDone').notEmpty().isBoolean();
export const bookmarkValidator = check('isBookmark').notEmpty().isBoolean();
export const favouriteValidator = check('isFavourite').notEmpty().isBoolean();
export const importantValidator = check('isImportant').notEmpty().isBoolean();
export const deletedValidator = check('isImportant').notEmpty().isBoolean();
