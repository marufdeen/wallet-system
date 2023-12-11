import { hashSync, compare } from "bcryptjs";

export const hashPassword = (password: string) => {
  let hashedPassword = hashSync(password, 10);
  return hashedPassword;
};

export const comparePassword = async (
  passwordInputed: string,
  existingPassword: string
) => {
  let compared = await compare(passwordInputed, existingPassword);
  if (!compared) throw new Error("Incorrect Password ");
  return compared;
};
