import type { Response } from "express";
import { APP_ENV } from "./env.js";

export const setCookies = (
  res: Response,
  name: string,
  token: string,
  expires: number
) => {
  res.cookie(name, token, {
    secure: APP_ENV === "production",
    httpOnly: true,
    sameSite: "strict",
    path: "/",
    maxAge: expires,
  });
};

export const clearCookies = (res: Response, name: string) => {
  res.clearCookie(name, {
    secure: APP_ENV === "production",
    httpOnly: true,
    sameSite: "strict",
    path: "/",
  });
};
