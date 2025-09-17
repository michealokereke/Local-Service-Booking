import { DateTime } from "luxon";
import { RefreshToken } from "../models/RefreshToken.js";
import { User } from "../models/User.js";
import { generateRandomCryptoToken, sha256 } from "../utils/crypto.js";
import { errorFormat } from "../utils/errorFormat.js";
import {
  signAccessToken,
  signRefreshToken,
  verifyRefreshToken,
} from "../utils/jwt.js";

export const createUser = async (params: {
  name: string;
  email: string;
  password: string;
  role: string;
}) => {
  const user = await new User(params);
  await user.save();

  return user;
};

export const findByEmail = (email: string) => User.findOne({ email });
export const userExistByEmail = (email: string) => User.exists({ email });

export const generateTokens = async (param: {
  userId: string;
  role: string;
  email: string;
}) => {
  const { userId, role, email } = param;

  const tokenId = generateRandomCryptoToken();
  const familyId = generateRandomCryptoToken();
  const tokenIdHash = sha256(tokenId);

  const ch_access = signAccessToken({ sub: userId, role, email });
  const ch_refresh = signRefreshToken({ tid: tokenId, familyId, userId });

  const refreshToken = await new RefreshToken({
    tokenId: tokenIdHash,
    familyId,
    userId,
  });

  return { ch_access, ch_refresh };
};

export const refreshService = async (req_ch_refresh: string) => {
  const decoded = verifyRefreshToken(req_ch_refresh);
  if (!decoded || typeof decoded === "string")
    throw errorFormat("invalid or expired refresh Token", 401);

  const { tid, familyId, userId } = decoded;

  const tidHash = sha256(tid);

  const refreshTokenfamily = await RefreshToken.findOne({ userId, familyId });

  if (
    !refreshTokenfamily ||
    refreshTokenfamily.revokedAt ||
    tidHash !== refreshTokenfamily.tokenId
  )
    throw errorFormat("invalid or expired refresh Token", 401);

  if (!refreshTokenfamily.updatedAt)
    throw errorFormat("invalid or expired refresh Token", 401);

  const updatedAt = DateTime.fromJSDate(refreshTokenfamily.updatedAt, {
    zone: "utc",
  });
  const now = DateTime.utc();
  const expiringAt = updatedAt.plus({ days: 7 });

  if (now > expiringAt) {
    refreshTokenfamily.revokedAt = now.toJSDate();
    throw errorFormat("invalid or expired refresh Token", 401);
  }

  const user = await User.findById(userId);

  if (!user) throw errorFormat("invalid or expired refresh Token", 401);

  const tokenId = generateRandomCryptoToken();
  const tokenIdHash = sha256(tokenId);

  refreshTokenfamily.tokenId = tokenIdHash;
  await refreshTokenfamily.save();

  const ch_access = signAccessToken({
    sub: userId,
    role: user.role,
    email: user.email,
  });
  const ch_refresh = signRefreshToken({ tid: tokenId, familyId, userId });

  return { ch_access, ch_refresh };
};

export const logoutService = async (reqRefreshToken: string) => {
  const decoded = verifyRefreshToken(reqRefreshToken);
  if (decoded && typeof decoded !== "string") {
    const { userId, familyId } = decoded;

    const refreshTokenfamily = await RefreshToken.findOne({ userId, familyId });

    if (refreshTokenfamily && !refreshTokenfamily.revokedAt) {
      refreshTokenfamily.revokedAt = DateTime.utc().toJSDate();
      await refreshTokenfamily.save();
    }
  }
};
