import mongoose, { Schema, Document, Model } from "mongoose";

export type AvailabilityType = "block" | "open";

export interface IAvailability extends Document {
  businessId: mongoose.Types.ObjectId;
  staffId?: mongoose.Types.ObjectId;
  date: Date; // can represent single day or range (need clarification)
  type: AvailabilityType;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

const AvailabilitySchema = new Schema<IAvailability>(
  {
    businessId: {
      type: Schema.Types.ObjectId,
      ref: "Business",
      required: true,
      index: true,
    },
    staffId: { type: Schema.Types.ObjectId, ref: "Staff" },
    date: { type: Date, required: true }, // for ranges, might need start/end fields if range
    type: { type: String, enum: ["block", "open"], required: true },
    notes: { type: String, trim: true },
  },
  { timestamps: true }
);

export const Availability: Model<IAvailability> = mongoose.model<IAvailability>(
  "Availability",
  AvailabilitySchema
);
