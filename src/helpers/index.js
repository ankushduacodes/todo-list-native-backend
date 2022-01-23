import bcrypt from 'bcryptjs';

export async function generateHash(password) {
  return bcrypt.hash(password.toString(), 10);
}

export async function checkPassword(password, userPassword) {
  return bcrypt.compare(password, userPassword);
}
