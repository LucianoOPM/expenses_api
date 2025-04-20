import * as bcrypt from 'bcryptjs';
type ComparePasswordProps = {
  hashPassword: string;
  rawPassword: string;
};

export const hashPassword = async (password: string) => {
  const salt = await bcrypt.genSalt();
  return await bcrypt.hash(password, salt);
};

export const comparePassword = async ({
  hashPassword,
  rawPassword,
}: ComparePasswordProps) => {
  return await bcrypt.compare(rawPassword, hashPassword);
};
