import { UserRepository } from "../repositories/userRepository";
import { User } from "@prisma/client";

export class UserService {
  private userRepository: UserRepository;

  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository;
  }

  async createUser(data: { name: string }): Promise<User> {
    return await this.userRepository.createUser(data);
  }
}
