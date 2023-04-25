import { UpdateUserDto } from "src/users/dto/update-user.dto";

export class UsersRepository {
  create(newUser: { password: string; coreId: number; techId: number; name: string; email: string; }) {
    throw new Error('Method not implemented.');
  }
  findAll() {
    throw new Error('Method not implemented.');
  }
  findOne(id: string) {
    throw new Error('Method not implemented.');
  }
  findByEmail(email: string) {
    throw new Error('Method not implemented.');
  }
  update(id: string, updateUserDto: UpdateUserDto) {
    throw new Error('Method not implemented.');
  }
  remove(id: string) {
    throw new Error('Method not implemented.');
  }
}
