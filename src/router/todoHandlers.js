import { validationResult } from 'express-validator';

export default function getAllTodos(req, res) {
  return res.json({ message: 'hello' });
}

export function addTodo(req, res) {
  const {
    // eslint-disable-next-line no-unused-vars
    item, isBookmark, isImportant, isFavourite, isDone,
  } = req.body;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const errMap = errors.mapped();
    return res.status(400).json({ message: 'Please provide all the required fields', err: errMap });
  }
  return res.send('added');
}
