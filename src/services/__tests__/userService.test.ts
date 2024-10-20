import { UserService } from "../userService";
import { UserRepository } from "../../repositories/userRepository";
import { PrismaClient } from "@prisma/client";

jest.mock("@prisma/client", () => {
  return {
    PrismaClient: jest.fn().mockImplementation(() => {
      return {
        user: {
          create: jest.fn(),
          update: jest.fn(),
          findUnique: jest.fn(),
          findFirst: jest.fn(),
        },
      };
    }),
  };
});

const prisma = new PrismaClient();
const userRepository = new UserRepository(prisma);
const userService = new UserService(userRepository);

const mockUser = { id: 1, name: "John Doe", isActiveUser: true };

describe("UserService", () => {
  beforeEach(() => {
    // Resetting the default mock behavior before each test
    (prisma.user.create as jest.Mock).mockResolvedValue(mockUser);
    (prisma.user.findUnique as jest.Mock).mockResolvedValue(mockUser);
    (prisma.user.findFirst as jest.Mock).mockResolvedValue(mockUser);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("createUser", () => {
    it("should create a user successfully", async () => {
      const userData = { name: "John Doe" };
      const newUser = await userService.createUser(userData);
      expect(newUser).toEqual(mockUser);
    });

    it("should handle error when creating user fails", async () => {
      (prisma.user.create as jest.Mock).mockRejectedValueOnce(
        new Error("Failed to create user"),
      );

      await expect(
        userService.createUser({ name: "Jane Doe" }),
      ).rejects.toThrow("Failed to create user");
    });
  });

  describe("getUserById", () => {
    const userId = 1;

    it("should get a user by id successfully", async () => {
      const user = await userService.getUserById(userId);
      expect(user).toEqual(mockUser);
    });

    it("should return null if user not found", async () => {
      (prisma.user.findUnique as jest.Mock).mockResolvedValueOnce(null);
      const user = await userService.getUserById(999);
      expect(user).toBeNull();
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

  describe("getActiveUser", () => {
    it("should get the active user successfully", async () => {
      const activeUser = await userService.getActiveUser();
      expect(activeUser).toEqual(mockUser);
    });

    it("should return null if no active user found", async () => {
      (prisma.user.findFirst as jest.Mock).mockResolvedValueOnce(null);
      const activeUser = await userService.getActiveUser();
      expect(activeUser).toBeNull();
    });

    it("should handle error when getting active user fails", async () => {
      (prisma.user.findFirst as jest.Mock).mockRejectedValueOnce(
        new Error("Failed to get active user"),
      );

      await expect(userService.getActiveUser()).rejects.toThrow(
        "Failed to get active user",
      );
    });
  });
});

describe("updateUser", () => {
  beforeEach(() => {
    (prisma.user.update as jest.Mock).mockResolvedValue(mockUser);
    (prisma.user.findUnique as jest.Mock).mockResolvedValue(mockUser);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should update a user successfully", async () => {
    const userId = 1;
    const userData = { name: "Updated John" };

    const updatedUser = await userService.updateUser(userId, userData);

    expect(updatedUser).toEqual(mockUser);
    expect(prisma.user.findUnique).toHaveBeenCalledWith({
      where: { id: userId },
    });
    expect(prisma.user.update).toHaveBeenCalledWith({
      where: { id: userId },
      data: userData,
    });
  });

  it("should return null if user not found", async () => {
    (prisma.user.findUnique as jest.Mock).mockResolvedValueOnce(null);

    const userId = 999;
    const userData = { name: "Non-existent user" };
    const result = await userService.updateUser(userId, userData);

    expect(result).toBeNull();
    expect(prisma.user.findUnique).toHaveBeenCalledWith({
      where: { id: userId },
    });
    expect(prisma.user.update).not.toHaveBeenCalled();
  });

  it("should handle error when updating user fails", async () => {
    (prisma.user.update as jest.Mock).mockRejectedValueOnce(
      new Error("Failed to update user"),
    );

    const userId = 1;
    const userData = { name: "John Doe" };

    await expect(userService.updateUser(userId, userData)).rejects.toThrow(
      "Failed to update user",
    );
  });
});
