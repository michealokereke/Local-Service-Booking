import mongoose from "mongoose";
import { MONGO_URI } from "../utils/env.js";

export const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("✅✅✅✅ connected to db successfully");
  } catch (error: any) {
    console.log(`❌❌❌${error.message}`);
    process.exit(1);
  }
};
