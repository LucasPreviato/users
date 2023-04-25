import { Injectable } from '@nestjs/common';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersRepository } from './repositories/mongo/users.repository';
import * as bcrypt from 'bcrypt';
import { User } from './entities/user.entity';

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
      const user = this.usersRepository.create(newUser);
      this.logger.info('User created', newUser);
      return {
        ...user,
        password: undefined,
      };
    } catch (error) {
      this.logger.error('Error creating user', error);
    }
  }

  findAll(): Promise<any> {
    try {
      const users = this.usersRepository.findAll();
      return {
        ...users,
        password: undefined,
      };
    } catch (error) {
      this.logger.error('Error creating user', error);
    }
  }

  findOne(id: string): Promise<any> {
    try {
      const user = this.usersRepository.findOne(id);
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
  FindByEmail(email: string): Promise<any> {
    try {
      const user = this.usersRepository.findByEmail(email);
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

  update(id: string, updateUserDto: UpdateUserDto): Promise<any> {
    try {
      const user = this.usersRepository.update(id, updateUserDto);
      if (!user) {
        throw new Error('User not found');
      }
      return user;
    } catch (error) {
      this.logger.error('Error creating user', error);
    }
  }

  remove(id: string): Promise<any> {
    this.logger.info('removing user');
    try {
      const user = this.usersRepository.remove(id);
      if (!user) {
        throw new Error('User not found');
      }
      return user;
    } catch (error) {
      this.logger.error('Error creating user', error);
    }
  }
}
