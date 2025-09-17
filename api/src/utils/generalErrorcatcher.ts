import type { RequestHandler, Request, Response, NextFunction } from "express";

export const generalErrorctaher =
  (func: RequestHandler) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await func(req, res, next);
    } catch (error) {
      next(error);
    }
  };
