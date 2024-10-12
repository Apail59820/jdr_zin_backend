import { Request } from "express";
import { PrismaClient } from "@prisma/client";
import { userSchema } from "../zod/userZods";
import { z } from "zod";
import LoggerSingleton from "../utils/winston";

const prisma = new PrismaClient();
const logger = LoggerSingleton.getLogger();

export const createUser = async (req: Request, res: any) => {
  try {
    const validatedData = userSchema.parse(req.body);

    const newUser = await prisma.user.create({
      data: validatedData as any,
    });

    res.status(201).json(newUser);
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      logger.warn(
        `Validation Error: ${error.errors.map((e) => e.message).join(", ")}`,
      );
      return res.status(400).json({
        error: "Invalid input",
        details: error.errors,
      });
    }

    logger.error(
      `Error while creating user : ${error.message}`,
    );
    res.status(500).json({ error: "Internal Server Error" });
  }
};
