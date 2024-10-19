import { Request, Response } from "express";
import { UserService } from "../services/userService";
import LoggerSingleton from "../utils/winston";

const logger = LoggerSingleton.getLogger();

export class UserController {
  private userService: UserService;

  constructor(userService: UserService) {
    this.userService = userService;
  }

  async createUser(req: Request, res: Response): Promise<void> {
    try {
      const userData = req.body;
      const newUser = await this.userService.createUser(userData);
      res.status(201).json(newUser);
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
      logger.error(error);
    }
  }

  async getUserById(req: Request, res: Response): Promise<void> {
    try {
      const userId = parseInt(req.params.id);
      const user = await this.userService.getUserById(userId);
      if (user) {
        res.status(200).json(user);
      } else {
        res.status(404).json({ error: "User not found" });
      }
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
      logger.error(error);
    }
  }

  async getActiveUser(req: Request, res: Response): Promise<void> {
    try {
      const activeUser = await this.userService.getActiveUser();
      if (activeUser) {
        res.status(200).json(activeUser);
      } else {
        res.status(404).json({ error: "No active user found" });
      }
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
}
