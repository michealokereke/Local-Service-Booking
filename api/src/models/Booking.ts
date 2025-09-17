import mongoose, { Schema, Document, Model } from "mongoose";

export type BookingStatus =
  | "pending"
  | "confirmed"
  | "cancelled"
  | "attended"
  | "no-show";
export type PaymentStatus = "none" | "pending" | "paid" | "refunded";

export interface IBookingClient {
  name: string;
  email: string;
  phone: string;
}

export interface IBooking extends Document {
  _id: mongoose.Types.ObjectId;
  businessId: mongoose.Types.ObjectId;
  serviceId: mongoose.Types.ObjectId;
  staffId?: mongoose.Types.ObjectId | null;
  client: IBookingClient;
  start: Date;
  end: Date; // computed: start + service duration
  status: BookingStatus;
  paymentStatus: PaymentStatus;
  stripePaymentId?: string | null;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

const BookingClientSchema = new Schema<IBookingClient>(
  {
    name: { type: String, required: true, trim: true },
    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },
    phone: { type: String },
  },
  { _id: false }
);

const BookingSchema = new Schema<IBooking>(
  {
    businessId: {
      type: Schema.Types.ObjectId,
      ref: "Business",
      required: true,
      index: true,
    },
    serviceId: { type: Schema.Types.ObjectId, ref: "Service", required: true },
    staffId: { type: Schema.Types.ObjectId, ref: "Staff", default: null },
    client: { type: BookingClientSchema, required: true },
    start: { type: Date, required: true },
    end: { type: Date, required: true },
    status: {
      type: String,
      enum: ["pending", "confirmed", "cancelled", "attended", "no-show"],
      required: true,
      index: true,
    },
    paymentStatus: {
      type: String,
      enum: ["none", "pending", "paid", "refunded"],
    },
    stripePaymentId: { type: String, default: null },
    notes: { type: String, trim: true },
  },
  { timestamps: true }
);

BookingSchema.index({ staffId: 1, start: 1 });

export const Booking: Model<IBooking> = mongoose.model<IBooking>(
  "Booking",
  BookingSchema
);
