import { PrismaClient, User } from "@prisma/client";

export class UserRepository {
  private prisma: PrismaClient;

  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
  }

  async createUser(data: { name: string }): Promise<User> {
    return this.prisma.user.create({
      data,
    });
  }
}
