import * as bcrypt from 'bcrypt';

export const hashPassword = async (password: string) => {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  return hashedPassword;
};

export const checkPassword = async (enteredPassword: string, hashedPassword: string) => {
  const isValid = await bcrypt.compare(enteredPassword, hashedPassword);
  return isValid;
};
