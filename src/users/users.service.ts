import { Injectable } from '@nestjs/common';
import { Roles } from './enum/roles.enum';
import { UserRepository } from './repositories/user.repository';

// This should be a real class/interface representing a user entity
export type User = any;

@Injectable()
export class UsersService {
  constructor(private readonly userRepository: UserRepository) {}

  async findOne(username: string): Promise<User | undefined> {
    return this.userRepository.findOne(username);
  }

  async findById(id: number) {
    return this.userRepository.findById(id);
  }

  async createUser(username: string, password: string) {
    const userFinded = await this.userRepository.findOne(username);
    if (userFinded) {
      throw new Error();
    }
    const user: User = {
      username,
      password,
      role: Roles.REGULAR,
    };
    return this.userRepository.create(user);
  }
}
