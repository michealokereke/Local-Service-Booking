import type { Request, RequestHandler } from "express";
import { errorFormat } from "../utils/errorFormat.js";
import { verifyAccessToken } from "../utils/jwt.js";
import type { JwtPayload } from "jsonwebtoken";
import type { AuthUser } from "./auth.middleware.js";

export const authMiddleware: RequestHandler = async (
  req: AuthUser,
  res,
  next
) => {
  const ch_access = req.cookies.ch_access;

  if (!ch_access) throw errorFormat("user not logged in", 401);

  const decoded = verifyAccessToken(ch_access);

  if (!decoded || typeof decoded === "string")
    throw errorFormat("invald Token", 401);

  req.user = decoded;

  next();
};
