import type { RequestHandler } from "express";
import {
  createUser,
  findByEmail,
  generateTokens,
  logoutService,
  refreshService,
  userExistByEmail,
} from "../service/auth.service.js";
import { errorFormat } from "../utils/errorFormat.js";
import { createBusiness } from "../service/busineiness.service.js";
import { clearCookies, setCookies } from "../utils/cookies.js";

export const registerUser: RequestHandler = async (req, res, next) => {
  const { email, role, password, name, businessName, currency, timezone } =
    req.body;

  const userExists = await userExistByEmail(email);

  if (userExists) throw errorFormat("user exists with this email", 409);

  const newUser = await createUser({ email, role, name, password });
  const business = await createBusiness({
    name: businessName,
    currency,
    timezone,
    ownerId: newUser._id,
  });

  newUser.businessId = business._id;
  await newUser.save();

  const { ch_access, ch_refresh } = await generateTokens({
    userId: newUser._id.toString(),
    role: newUser.role,
    email: newUser.email,
  });

  setCookies(res, "ch_access", ch_access, 1000 * 60 * 15);
  setCookies(res, "ch_refresh", ch_refresh, 1000 * 60 * 60 * 24 * 7);

  res.status(201).json({
    message: "user created successfully",
    user: { id: newUser._id, email: newUser.email, name: newUser.name },
  });
};

export const login: RequestHandler = async (req, res, next) => {
  const { email, password } = req.body;

  const user = await findByEmail(email);
  if (!user) throw errorFormat("invalid credentials", 401);

  const userVerified = await user.verifyHash();
  if (!userVerified) throw errorFormat("invalid credentials", 401);

  const { ch_access, ch_refresh } = await generateTokens({
    userId: user._id.toString(),
    role: user.role,
    email: user.email,
  });

  setCookies(res, "ch_access", ch_access, 1000 * 60 * 15);
  setCookies(res, "ch_refresh", ch_refresh, 1000 * 60 * 60 * 24 * 7);

  res.status(200).json({
    message: "user LogedIn successfully",
    user: { id: user._id, email: user.email, name: user.name },
  });
};

export const refresh: RequestHandler = async (req, res, next) => {
  const req_ch_refresh = req.cookies.ch_refresh;

  if (!req_ch_refresh) throw errorFormat("no refresh Token", 401);

  const { ch_access, ch_refresh } = await refreshService(req_ch_refresh);

  setCookies(res, "ch_access", ch_access, 1000 * 60 * 15);
  setCookies(res, "ch_refresh", ch_refresh, 1000 * 60 * 60 * 24 * 7);
  res.status(200).json({
    message:
      "refresh Token and access token rotated and refreshed successfully",
  });
};

export const logout: RequestHandler = async (req, res, next) => {
  const reqRefreshToken = req.cookies.ch_refresh;

  try {
    await logoutService(reqRefreshToken);
  } catch (error) {}

  clearCookies(res, "ch_refresh");
  clearCookies(res, "ch_access");

  res.json({ message: "user logout successfully" });
};
