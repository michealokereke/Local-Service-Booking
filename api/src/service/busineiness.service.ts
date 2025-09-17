import type { Types } from "mongoose";
import { Business } from "../models/Business.js";

export const createBusiness = async (params: {
  name: string;
  currency: string;
  timezone: string;
  ownerId: Types.ObjectId;
}) => {
  const business = await new Business(params);
  await business.save();
  return business;
};
