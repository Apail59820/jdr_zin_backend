import { UserRepository } from "../repositories/userRepository";
import { User } from "@prisma/client";
import { UserModel } from "../models/userModel";

export class UserService {
  private userRepository: UserRepository;

  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository;
  }

  async createUser(data: Partial<UserModel>): Promise<User> {
    return await this.userRepository.createUser(data);
  }

  async getUserById(id: number): Promise<User | null> {
    return await this.userRepository.getUserById(id);
  }

  async getActiveUser(): Promise<User | null> {
    return await this.userRepository.getActiveUser();
  }

  async updateUser(id: number, data: Partial<UserModel>): Promise<User | null> {
    return await this.userRepository.updateUser(id, data);
  }
}
