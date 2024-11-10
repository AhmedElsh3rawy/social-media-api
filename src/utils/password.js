import bcrypt from "bcrypt";

export const hashPassword = (password) => {
  return bcrypt.hashSync(password, 10);
};

export const comparePasswords = (password, hashed) => {
  return bcrypt.compareSync(password, hashed);
};
