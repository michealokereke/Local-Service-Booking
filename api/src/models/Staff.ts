import mongoose, { Schema, Document, Model, Types } from "mongoose";

export interface IWorkingHour {
  day: number; // 0 = Sunday ... 6 = Saturday
  from: string; // "HH:mm" format
  to: string; // "HH:mm" format
}

export interface IStaff extends Document {
  _id: Types.ObjectId;
  businessId: mongoose.Types.ObjectId;
  userId?: mongoose.Types.ObjectId; // optional user ref
  displayName: string;
  workingHours: IWorkingHour[];
  createdAt: Date;
  updatedAt: Date;
}

const WorkingHourSchema = new Schema<IWorkingHour>(
  {
    day: { type: Number, min: 0, max: 6, required: true },
    from: {
      type: String,
      required: true,
    },
    to: {
      type: String,
      required: true,
    },
  },
  { _id: false }
);

const StaffSchema = new Schema<IStaff>(
  {
    businessId: {
      type: Schema.Types.ObjectId,
      ref: "Business",
      required: true,
      index: true,
    },
    userId: { type: Schema.Types.ObjectId, ref: "User" },
    displayName: { type: String, required: true, trim: true },
    workingHours: { type: [WorkingHourSchema], default: [] },
  },
  { timestamps: true }
);

export const Staff: Model<IStaff> = mongoose.model<IStaff>(
  "Staff",
  StaffSchema
);
