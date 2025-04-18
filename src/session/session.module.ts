import { Module } from '@nestjs/common';
import { SessionService } from './session.service';
import { SessionController } from './session.controller';
import { DrizzleModule } from '@/drizzle/drizzle.module';

@Module({
  imports: [DrizzleModule],
  controllers: [SessionController],
  providers: [SessionService],
})
export class SessionModule {}
