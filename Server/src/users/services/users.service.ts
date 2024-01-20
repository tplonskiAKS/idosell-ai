import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/typeorm/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  async createUser(createUserDto: Partial<User>): Promise<User> {
    const newUser = this.usersRepository.create(createUserDto);
    return this.usersRepository.save(newUser);
  }

  async findUsersById(id: number): Promise<User> {
    return this.usersRepository.findOneBy({ id });
  }

  async findBy(query: Partial<User>): Promise<User[]> {
    return this.usersRepository.find({ where: query });
  }

  async getUsers(): Promise<User[]> {
    return this.usersRepository.find();
  }
}
