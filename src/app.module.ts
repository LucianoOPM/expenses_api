import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MovementsModule } from '@/movements/movements.module';
import { DrizzleModule } from '@/drizzle/drizzle.module';
import { SessionModule } from '@/session/session.module';
import { UsersModule } from '@/users/users.module';
import configuration from '@/config/configuration';

@Module({
  imports: [
    ConfigModule.forRoot({ load: [configuration], isGlobal: true }),
    MovementsModule,
    SessionModule,
    UsersModule,
    DrizzleModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
