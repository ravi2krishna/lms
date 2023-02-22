import HttpException from "../common/http-exception";
import { Request, Response, NextFunction } from "express";
import { z } from "zod";

export const errorHandler = (
  error: HttpException,
  req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  next: NextFunction
) => {
  console.log("🚀 ~ file: error.middleware.ts ~ line 13 ~ error", error);
  const status = error.statusCode || error.status || 500;

  if (error instanceof z.ZodError) {
    return res.status(400).json({
      message: "Invalid request",
    });
  }

  res.status(status).send(error);
};
