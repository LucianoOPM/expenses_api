import { BadRequestException, Injectable } from '@nestjs/common';
import { UserRepository } from '@/users/user.repository';
import { hashPassword } from '@/lib/bcrypt';
import { HttpStatus } from '@nestjs/common';
import {
  CreateUserDto,
  QueryUserDto,
  UpdateUserDto,
} from '@/users/dto/user.dto';
import { NoPasswordUser, User } from '@/types/users.types';

const parseUser = (user: User): NoPasswordUser => {
  const { password, ...rest } = user;
  return { ...rest };
};

@Injectable()
export class UsersService {
  constructor(protected readonly userRepository: UserRepository) {}

  async createUser(userData: CreateUserDto): Promise<NoPasswordUser> {
    const user = await this.userRepository.findByEmail(userData.email);
    if (user) {
      throw new BadRequestException({
        error: 'User already exists',
        code: HttpStatus.BAD_REQUEST,
        ok: false,
      });
    }
    const hashedPassword = await hashPassword(userData.password);
    const saveUser = {
      firstName: userData.firstName,
      lastName: userData.lastName,
      email: userData.email,
      password: hashedPassword,
      role: userData.role || 'USER',
      isActive: userData.isActive ?? true,
    };
    const [{ idUser }] = await this.userRepository.create(saveUser);
    const toReturn = parseUser({ ...saveUser, idUser });
    return toReturn;
  }

  async getUsers(query: QueryUserDto) {
    const { data, page, limit, totalPages } =
      await this.userRepository.findAll(query);
    const users = data.map(parseUser);
    return {
      data: users,
      page,
      limit,
      totalPages,
    };
  }

  async getUser(idUser: number): Promise<NoPasswordUser> {
    const user = await this.userRepository.findById(idUser);
    if (!user) {
      throw new BadRequestException({
        error: 'User not found',
        code: HttpStatus.BAD_REQUEST,
        ok: false,
      });
    }
    return parseUser(user);
  }

  async updateUser(userData: UpdateUserDto, idUser: number) {
    const user = await this.userRepository.findById(idUser);
    if (!user) {
      throw new BadRequestException({
        message: "User doesn't exists",
        status: HttpStatus.BAD_REQUEST,
        ok: false,
      });
    }
    const userUpdateData = {};
    if (userData.firstName) userUpdateData['firstName'] = userData.firstName;
    if (userData.lastName) userUpdateData['lastName'] = userData.lastName;
    if (userData.password) {
      userUpdateData['password'] = await hashPassword(userData.password);
    }
    if (userData.isActive) userUpdateData['isActive'] = userData.isActive;
    if (userData.role) userUpdateData['role'] = userData.role;

    await this.userRepository.update(userUpdateData, idUser);
    const userResponse = parseUser({ ...user, ...userUpdateData });
    return userResponse;
  }

  async deleteLogical(idUser: number) {
    const user = await this.userRepository.findById(idUser);
    if (!user) {
      throw new BadRequestException({
        message: "User doesn't exists",
        ok: false,
        status: HttpStatus.BAD_REQUEST,
      });
    }
    await this.userRepository.update({ isActive: false }, idUser);
    const userResponse = parseUser({ ...user, isActive: false });
    return userResponse;
  }
}
