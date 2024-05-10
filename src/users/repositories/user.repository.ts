import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcryptjs';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';

@Injectable()
export class UserRepository {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async findAll() {
    return this.userRepository.find();
  }

  async findOne(username: string) {
    return this.userRepository.findOneBy({ username });
  }

  async create(user: User) {
    try {
      const usuario = this.userRepository.create(user);
      usuario.password = await bcrypt.hash(usuario.password, 8);
      return await this.userRepository.save(usuario);
    } catch (error) {
      throw new Error(error);
    }
  }

  async findById(id: number) {
    return this.userRepository.findOne({ where: { id } });
  }
}
