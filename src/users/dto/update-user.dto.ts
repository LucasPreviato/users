import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  coreId: number;
  techId: number;
  name: string;
  email: string;
  password: string;
}
