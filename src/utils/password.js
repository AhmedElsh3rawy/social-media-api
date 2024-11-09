import bcrypt from "bcrypt";

export const hashPassword = (password) => {
  return bcrypt.hashSync(password, process.env.SALT_ROUNDS);
};

export const comparePasswords = (password, hashed) => {
  return bcrypt.compareSync(password, hashed);
};
