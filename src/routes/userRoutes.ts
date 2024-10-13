import { Router } from "express";
import { UserController } from "../controllers/userControllers";
import { UserService } from "../services/userService";
import { UserRepository } from "../repositories/userRepository";
import { validateUser } from "../middlewares/validateUser";
import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const router = Router();
const prisma = new PrismaClient();
const userRepository = new UserRepository(prisma);
const userService = new UserService(userRepository);
const userController = new UserController(userService);

router.post("/", validateUser, (req: Request, res: Response) =>
  userController.createUser(req, res),
);

export default router;
