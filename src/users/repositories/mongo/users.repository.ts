import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { User, UserDocument } from 'src/users/entities/user.entity';

export class UsersRepository {
  constructor(
    @InjectPinoLogger(UsersRepository.name) private readonly logger: PinoLogger,
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
  ) {}
  async create(user: User): Promise<User> {
    try {
      const newUser = new this.userModel(user);
      return await newUser.save();
    } catch (error) {
      this.logger.error('Error creating user', error);
    }
  }
  async findAll(): Promise<User[]> {
    try {
      return await this.userModel.find().exec();
    } catch (error) {
      this.logger.error('Error finding users', error);
    }
  }
  async findOne(id: string): Promise<User> {
    this.logger.info('Finding user by id in database');
    try {
      const user = await this.userModel.findById(id).exec();
      if (!user) {
        this.logger.warn('User not found', id);
        throw new Error('User not found');
      }
      return user;
    } catch (error) {
      this.logger.error('Error finding user', error);
    }
  }
  async findByEmail(email: string): Promise<User> {
    this.logger.info('Finding user by email in database');
    try {
      const user = await this.userModel.findOne({ email }).exec();
      if (!user) {
        this.logger.warn('User not found', email);
        throw new Error('User not found');
      }
      return user;
    } catch (error) {
      this.logger.error('Error finding user', error);
    }
  }
  async update(id: string, user: User): Promise<User> {
    try {
      const updatedUser = await this.userModel.findByIdAndUpdate(id, user, {
        new: true,
      });
      if (!updatedUser) {
        this.logger.warn('User not found', id);
        throw new Error('User not found');
      }
      return updatedUser;
    } catch (error) {
      this.logger.error('Error updating user', error);
    }
  }
  async remove(id: string): Promise<User> {
    try {
      const deletedUser = await this.userModel.findByIdAndDelete(id);
      if (!deletedUser) {
        this.logger.warn('User not found', id);
        throw new Error('User not found');
      }
      return deletedUser;
    } catch (error) {
      this.logger.error('Error deleting user', error);
    }
  }
}
