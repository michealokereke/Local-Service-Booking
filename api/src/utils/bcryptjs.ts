import { hash, compare } from "bcryptjs";

export const hashValue = (password: string, saltRounds: number) =>
  hash(password, saltRounds);

export const compareValue = (password: string, passwordHash: string) =>
  compare(password, passwordHash);
