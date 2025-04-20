import {
  Controller,
  Post,
  Body,
  BadRequestException,
  InternalServerErrorException,
  Param,
  Get,
  Query,
  Req,
  Put,
  ParseIntPipe,
  Patch,
} from '@nestjs/common';
import { UsersService } from '@/users/users.service';
import {
  CreateUserSchema,
  CreateUserDto,
  QueryUserSchema,
  QueryUserDto,
  UpdateUserSchema,
  UpdateUserDto,
} from '@/users/dto/user.dto';
import { ZodValidationPipe } from '@/pipes/zod.pipe';
import { Request } from 'express';
import { pageHandler } from '@/lib/pagination';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async create(
    @Body(new ZodValidationPipe(CreateUserSchema)) createUserDto: CreateUserDto,
  ) {
    try {
      const userInfo = await this.usersService.createUser(createUserDto);
      return {
        message: 'User created successfully',
        ok: true,
        data: userInfo,
      };
    } catch (error: unknown) {
      if (error instanceof BadRequestException) {
        throw error;
      } else {
        throw new InternalServerErrorException('Something went wrong');
      }
    }
  }

  @Get(':idUser')
  async getUser(@Param('idUser', ParseIntPipe) idUser: number) {
    try {
      const user = await this.usersService.getUser(idUser);
      return {
        message: 'User found successfully',
        ok: true,
        data: user,
      };
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      } else {
        throw new InternalServerErrorException('Something went wrong');
      }
    }
  }

  @Get()
  async getUsers(
    @Query(new ZodValidationPipe(QueryUserSchema)) query: QueryUserDto,
    @Req() req: Request,
  ) {
    try {
      const result = await this.usersService.getUsers(query);
      const { data, page, limit, totalPages } = result;
      const { nextPage, previousPage } = pageHandler({
        req,
        page,
        totalPages,
      });
      return {
        message: 'Users found successfully',
        ok: true,
        data: { users: data, page, totalPages, nextPage, previousPage, limit },
      };
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      } else {
        throw new InternalServerErrorException('Something went wrong');
      }
    }
  }

  @Put(':idUser')
  async updateUser(
    @Body(new ZodValidationPipe(UpdateUserSchema)) updateData: UpdateUserDto,
    @Param('idUser', ParseIntPipe) idUser: number,
  ) {
    try {
      const updatedUser = await this.usersService.updateUser(
        updateData,
        idUser,
      );
      return {
        message: 'User updated succesfully',
        ok: true,
        data: updatedUser,
      };
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      } else {
        throw new InternalServerErrorException('Something went wrong');
      }
    }
  }

  @Patch(':idUser')
  async deleteUser(@Param('idUser', ParseIntPipe) idUser: number) {
    try {
      const deletedUser = await this.usersService.deleteLogical(idUser);
      return {
        message: 'User deleted succesfully',
        ok: true,
        data: deletedUser,
      };
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      } else {
        throw new InternalServerErrorException('Something went wrong');
      }
    }
  }
}
