import { Injectable } from '@nestjs/common';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersRepository } from './repositories/mongo/users.repository';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectPinoLogger(UsersService.name) private readonly logger: PinoLogger,
    private readonly usersRepository: UsersRepository,
  ) {}

  async create(createUserDto: CreateUserDto) {
    this.logger.info('Creating user');
    try {
      const newUser = {
        ...createUserDto,
        password: await bcrypt.hash(createUserDto.password, 10),
      };
      const user = await this.usersRepository.create(newUser);
      this.logger.info('User created', newUser);
      return {
        ...user,
        password: undefined,
      };
    } catch (error) {
      this.logger.error('Error creating user', error);
    }
  }

  async findAll() {
    try {
      const users = await this.usersRepository.findAll();
      return {
        ...users,
        password: undefined,
      };
    } catch (error) {
      this.logger.error('Error creating user', error);
    }
  }

  async findOne(id: string) {
    try {
      const user = await this.usersRepository.findOne(id);
      if (!user) {
        throw new Error('User not found');
      }
      return {
        ...user,
        password: undefined,
      };
    } catch (error) {
      this.logger.error('Error creating user', error);
    }
  }
  async FindByEmail(email: string) {
    try {
      const user = await this.usersRepository.findByEmail(email);
      if (!user) {
        throw new Error('User not found');
      }
      return {
        ...user,
        password: undefined,
      };
    } catch (error) {
      this.logger.error('Error creating user', error);
    }
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    try {
      const user = await this.usersRepository.update(id, updateUserDto);
      if (!user) {
        throw new Error('User not found');
      }
      return user;
    } catch (error) {
      this.logger.error('Error creating user', error);
    }
  }

  async remove(id: string): Promise<any> {
    this.logger.info('removing user');
    try {
      const user = await this.usersRepository.remove(id);
      if (!user) {
        throw new Error('User not found');
      }
      return user;
    } catch (error) {
      this.logger.error('Error creating user', error);
    }
  }
}
