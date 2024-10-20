import { PrismaClient, User } from "@prisma/client";
import {UserModel} from "../models/userModel";

export class UserRepository {
  private prisma: PrismaClient;

  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
  }

  async createUser(data: Partial<UserModel>): Promise<User> {
    return this.prisma.user.create(data as any);
  }

  async getUserById(id: number): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: { id },
    });
  }
  async getActiveUser(): Promise<User | null> {
    return this.prisma.user.findFirst({
      where: { isActiveUser: true },
    });
  }

  async updateUser(id: number, data: Partial<UserModel>): Promise<User | null> {
    const user = await this.prisma.user.findUnique({ where: { id } });

    if (!user) {
      return null;
    }

    return this.prisma.user.update({
      where: { id },
      data,
    });
  }
}
