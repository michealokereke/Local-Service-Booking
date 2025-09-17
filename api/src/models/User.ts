import mongoose, { Schema, Document, Model, Types } from "mongoose";
import { compareValue, hashValue } from "../utils/bcryptjs.js";

export type UserRole = "owner" | "staff" | "client";

export interface IUser extends Document {
  _id: Types.ObjectId;
  name: string;
  email: string;
  password: string;
  role: UserRole;
  businessId: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
  phone: string;

  verifyHash(): Promise<boolean>;
}

const UserSchema = new Schema<IUser>(
  {
    name: { type: String, required: true, trim: true },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["owner", "staff", "client"],
      required: true,
      default: "owner",
    },
    businessId: {
      type: Schema.Types.ObjectId,
      ref: "Business",
      required: function () {
        return this.role === "staff";
      },
    },
    phone: { type: String },
  },
  { timestamps: true }
);

UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await hashValue(this.password, 12);
  next();
});

UserSchema.methods.deletePassword = async function () {
  const returnedDoc = this.toObject();
  delete returnedDoc.password;
  return returnedDoc;
};

UserSchema.methods.verifyHash = async function (password: string) {
  return compareValue(password, this.password);
};

export const User: Model<IUser> = mongoose.model<IUser>("User", UserSchema);
