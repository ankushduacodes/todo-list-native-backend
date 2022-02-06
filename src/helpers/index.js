import bcrypt from 'bcryptjs';

export async function generateHash(password) {
  const saltRounds = 10;
  const salt = await bcrypt.genSalt(saltRounds);
  return bcrypt.hash(password, salt);
}

export async function checkPassword(password, userPassword) {
  return bcrypt.compare(password, userPassword);
}
