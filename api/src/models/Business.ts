import mongoose, { Schema, Document, Model, Types } from "mongoose";

export interface IBusiness extends Document {
  _id: Types.ObjectId;
  currency: string;
  name: string;
  address?: string;
  timezone: string;
  ownerId: mongoose.Types.ObjectId;
  settings: {
    depositPercent?: number;
    minLeadTimeMinutes?: number;
  };
  createdAt: Date;
  updatedAt: Date;
}

const BusinessSchema = new Schema<IBusiness>(
  {
    name: { type: String, required: true, trim: true },
    address: { type: String, trim: true },
    timezone: { type: String, required: true, trim: true },
    ownerId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    settings: {
      depositPercent: { type: Number, default: 0, min: 0, max: 100 },
      minLeadTimeMinutes: { type: Number, default: 0, min: 0 },
    },
    currency: { type: String, required: true },
  },
  { timestamps: true }
);

export const Business: Model<IBusiness> = mongoose.model<IBusiness>(
  "Business",
  BusinessSchema
);
