import type { ErrorRequestHandler } from "express";

export const errorMiddleware: ErrorRequestHandler = (err, req, res, next) => {
  const status = err.status || 500;
  res.status(status).json({ message: err.message });
};
