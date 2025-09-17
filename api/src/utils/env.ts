import { errorFormat } from "./errorFormat.js";

const getEnv = (value: string, defaultValue?: string) => {
  const envValue = process.env[value] || defaultValue;
  if (!envValue) throw errorFormat(`${value} value not found`, 500);
  return envValue;
};

export const PORT = getEnv("PORT", "4000");
export const MONGO_URI = getEnv("MONGO_URI");
export const CLIENT_URL = getEnv("CLIENT_URL");
export const JWT_ACCESS_EXPIRE = getEnv("JWT_ACCESS_EXPIRE");
export const JWT_ACCESS_SECRET = getEnv("JWT_ACCESS_SECRET");
export const JWT_REFRESH_SECRET = getEnv("JWT_REFRESH_SECRET");
export const JWT_REFRESH_EXPIRE = getEnv("JWT_REFRESH_EXPIRE");
export const APP_ENV = getEnv("APP_ENV");
