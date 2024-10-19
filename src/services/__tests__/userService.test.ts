import { UserService } from "../userService";
import { UserRepository } from "../../repositories/userRepository";
import { PrismaClient } from "@prisma/client";

jest.mock("@prisma/client", () => {
  return {
    PrismaClient: jest.fn().mockImplementation(() => {
      return {
        user: {
          create: jest.fn().mockResolvedValue({ id: 1, name: "John Doe" }),
          findUnique: jest.fn().mockResolvedValue({ id: 1, name: "John Doe" }),
        },
      };
    }),
  };
});

const prisma = new PrismaClient();
const userRepository = new UserRepository(prisma);
const userService = new UserService(userRepository);

describe("UserService", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should create a user successfully", async () => {
    const userData = { name: "John Doe" };
    const newUser = await userService.createUser(userData);
    expect(newUser).toEqual({ id: 1, name: "John Doe" });
  });

  it("should get a user by id successfully", async () => {
    const userId = 1;
    const user = await userService.getUserById(userId);
    expect(user).toEqual({ id: 1, name: "John Doe" });
  });

  it("should return null if user not found", async () => {
    (prisma.user.findUnique as jest.Mock).mockResolvedValueOnce(null);
    const user = await userService.getUserById(999);
    expect(user).toBeNull();
  });

  it("should handle error when creating user fails", async () => {
    (prisma.user.create as jest.Mock).mockRejectedValueOnce(
      new Error("Failed to create user"),
    );

    await expect(userService.createUser({ name: "Jane Doe" })).rejects.toThrow(
      "Failed to create user",
    );
  });

  it("should handle error when getting user by id fails", async () => {
    (prisma.user.findUnique as jest.Mock).mockRejectedValueOnce(
      new Error("Failed to get user"),
    );

    await expect(userService.getUserById(1)).rejects.toThrow(
      "Failed to get user",
    );
  });
});
