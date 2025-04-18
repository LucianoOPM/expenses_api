import { Module } from '@nestjs/common';
import { AppController } from '@/app.controller';
import { AppService } from '@/app.service';
import { ConfigModule } from '@nestjs/config';
import { MovementsModule } from '@/movements/movements.module';
import { DrizzleModule } from '@/drizzle/drizzle.module';
import { SessionModule } from '@/session/session.module';
import configuration from '@/config/configuration';

@Module({
  imports: [
    ConfigModule.forRoot({load: [configuration], isGlobal: true}), 
    MovementsModule, 
    SessionModule, 
    DrizzleModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
