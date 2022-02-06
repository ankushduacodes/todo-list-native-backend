import jwt from 'jsonwebtoken';

import {
  validationResult,
} from 'express-validator';
import User from '../db/schema/user.schema.js';
import { checkPassword, generateHash } from '../helpers/index.js';

export default async function loginHandler(req, res) {
  const { email, password } = req.body;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const errMap = errors.mapped();
    return res.status(403).json({ message: `Got invalid entries: ${Object.keys(errMap)}` });
  }
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(403).json({ message: 'User does not exist', errCode: 100 });
    }
    if (!(await checkPassword(password, user.password))) {
      return res.status(403).json({ message: 'forbidden access' });
    }
    const userPayload = {
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
    };
    const accessToken = jwt.sign(userPayload, process.env.JWT_ACCESS_TOKEN);
    return res.status(200).json({ ...userPayload, accessToken });
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
    return res.status(403).json({ message: 'Passwords do not match... Please try again' });
  }

  try {
    const exUser = await User.findOne({ email });
    if (exUser) {
      return res.status(409).json({ message: 'User already exists, Please login' });
    }
    const encryptedPassword = await generateHash(password);
    const newUser = await new User({
      firstName,
      lastName,
      email,
      password: encryptedPassword,
    });
    await newUser.save();
    return res.json({ message: 'user created' });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: 'something went wrong on the server' });
  }
}
