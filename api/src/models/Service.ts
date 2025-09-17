import mongoose, { Schema, Document, Model, Types } from "mongoose";

export interface IService extends Document {
  _id: Types.ObjectId;
  businessId: mongoose.Types.ObjectId;
  title: string;
  durationMinutes: number;
  priceCents: number;
  staffRequired: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const ServiceSchema = new Schema<IService>(
  {
    businessId: {
      type: Schema.Types.ObjectId,
      ref: "Business",
      required: true,
      index: true,
    },
    title: { type: String, required: true, trim: true },
    durationMinutes: { type: Number, required: true, min: 1 },
    priceCents: { type: Number, required: true, min: 0 },
    staffRequired: { type: Boolean },
  },
  { timestamps: true }
);

export const Service: Model<IService> = mongoose.model<IService>(
  "Service",
  ServiceSchema
);
