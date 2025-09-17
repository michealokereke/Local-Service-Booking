import express from "express";
import { CLIENT_URL, PORT } from "./utils/env.js";
import { connectDB } from "./config/connectDB.js";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import cors from "cors";
import authRouter from "./routes/Auth.route.js";
import { DateTime } from "luxon";

const app = express();

app.use(cookieParser());
app.use(helmet());
app.use(
  cors({
    origin: CLIENT_URL,
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1/auth", authRouter);
app.get("/", (req, res, next) => {
  const then = DateTime.fromISO("2025-09-15T17:01:12.747+00:00", {
    zone: "utc",
  });
  const now = DateTime.utc();

  console.log(then);
  console.log(now);

  console.log(then.plus({ days: 7 }));

  console.log(now > then.plus({ days: 7 }));

  console.log("2025-09-15T17:01:12.747+00:00");

  res.json({ time: DateTime.now() });
});

await connectDB();
app.listen(PORT, () => {
  console.log(`server started on port ${PORT}\nhttp://localhost:${PORT}`);
});
