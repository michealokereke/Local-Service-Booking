import jwt from "jsonwebtoken";
import { JWT_ACCESS_SECRET, JWT_REFRESH_SECRET } from "./env.js";

export const signAccessToken = (payload: {
  sub: string;
  email: string;
  role: string;
}) =>
  jwt.sign(payload, JWT_ACCESS_SECRET, {
    expiresIn: "15m",
  });

export const signRefreshToken = (payload: {
  userId: string;
  familyId: string;
  tid: string;
}) => jwt.sign(payload, JWT_REFRESH_SECRET, { expiresIn: "7d" });

export const verifyAccessToken = (token: string) =>
  jwt.verify(token, JWT_ACCESS_SECRET);

export const verifyRefreshToken = (token: string) =>
  jwt.verify(token, JWT_REFRESH_SECRET);
