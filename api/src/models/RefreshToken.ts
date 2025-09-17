import mongoose, { Schema, model } from "mongoose";

export interface IRefreshToken {
  userId: mongoose.Types.ObjectId;
  familyId: string;
  tokenId: string;
  revokedAt?: Date | null;
  createdAt?: Date;
  updatedAt?: Date;
}

const RefreshTokenSchema = new Schema<IRefreshToken>(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    familyId: { type: String, required: true },
    tokenId: { type: String, required: true, index: true },
    revokedAt: { type: Date, default: null },
  },
  { timestamps: true }
);

RefreshTokenSchema.index({ userId: 1, familyId: 1 }, { unique: true });

export const RefreshToken = model<IRefreshToken>(
  "RefreshToken",
  RefreshTokenSchema
);
