// eslint-disable-next-line no-unused-vars
import bcrypt from 'bcryptjs';
// eslint-disable-next-line import/extensions
import User from '../db/schema/user.schema.js';

// eslint-disable-next-line no-unused-vars
export default function loginHandler(req, res) {

}

// eslint-disable-next-line consistent-return
export async function registerHandler(req, res) {
  const {
    firstName, lastName, email, password, confirmPassword,
  } = req.body;
  // TODO add proper validations for above fields using express-validator
  if (!firstName || !lastName || !email || !password || !confirmPassword) {
    return res.json({ message: 'Please include fname, lname, email, pass, cpass' });
  }
  if (confirmPassword !== password) {
    return res.json({ message: 'Passwords do not match... Please try again' });
  }

  try {
    const exUser = await User.findOne({ email });
    if (exUser) {
      return res.status(409).json({ message: 'User already exists, Please login' });
    }
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
