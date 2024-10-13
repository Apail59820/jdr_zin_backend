import { Request, Response, NextFunction } from "express";
import { userSchema } from "../zod/userZods";
import { z } from "zod";
import LoggerSingleton from "../utils/winston";
import { RequestHandler } from "express";

const logger = LoggerSingleton.getLogger();

export const validateUser: RequestHandler = (req, res, next) => {
  try {
    userSchema.parse(req.body);
    next();
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      logger.warn(
        `Validation Error: ${error.errors.map((e) => e.message).join(", ")}`,
      );
      res.status(400).json({
        error: "Invalid input",
        details: error.errors,
      });
    }
  }
};
