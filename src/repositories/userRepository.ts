import { PrismaClient, User } from "@prisma/client";
import {UserModel} from "../models/userModel";

export class UserRepository {
  private prisma: PrismaClient;

  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
  }

  async createUser(data: Partial<UserModel>): Promise<User> {
    return this.prisma.user.create({
      data,
    } as any);
  }

  async getUserById(id: number): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: { id },
    });
  }
}
