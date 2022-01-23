// eslint-disable-next-line no-unused-vars
import bcrypt from 'bcryptjs';
import {
  validationResult,
} from 'express-validator';
// eslint-disable-next-line import/extensions
import User from '../db/schema/user.schema.js';

export default async function loginHandler(req, res) {
  const { email, password } = req.body;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const errMap = errors.mapped();
    return res.status(403).json({ message: `Got invalid entries: ${Object.keys(errMap)}` });
  }
  try {
    const user = await User.findOne({ email });
    // todo extract compare logic into another function
    if (user && (await bcrypt.compare(password, user.password))) {
      return res.status(200).json(user);
    }
    return res.status(403).json({ message: 'forbidden access' });
  } catch (err) {
    // eslint-disable-next-line no-console
    console.log(err);
    return res.status(403).json({ message: 'forbidden access' });
  }
}

export async function registerHandler(req, res) {
  const {
    firstName, lastName, email, password, confirmPassword,
  } = req.body;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const errMap = errors.mapped();
    return res.status(403).json({ message: `Got invalid entries: ${Object.keys(errMap)}` });
  }
  if (confirmPassword !== password) {
    return res.json({ message: 'Passwords do not match... Please try again' });
  }

  try {
    const exUser = await User.findOne({ email });
    if (exUser) {
      return res.status(409).json({ message: 'User already exists, Please login' });
    }
    // todo extract following hashing into another file to keep the handler concise
    const encryptedPassword = await bcrypt.hash(password.toString(), 10);
    const newUser = {
      firstName,
      lastName,
      email,
      password: encryptedPassword,
    };
    await User.create(newUser);
    return res.json({ message: 'user created' });
  } catch (err) {
    // eslint-disable-next-line no-console
    console.log(err);
    return res.status(401).json({ message: 'something went wrong on the server' });
  }
}
