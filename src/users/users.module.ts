import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { DrizzleModule } from '@/drizzle/drizzle.module';
import { UserRepository } from '@/users/user.repository';
import { UsersService } from '@/users/users.service';

@Module({
  imports: [DrizzleModule],
  controllers: [UsersController],
  providers: [UsersService, UserRepository],
})
export class UsersModule {}
