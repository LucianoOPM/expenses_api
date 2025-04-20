import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { createPool } from 'mysql2/promise';
import * as schema from './schema';
import { drizzle } from 'drizzle-orm/mysql2';

@Module({
  imports: [ConfigModule],
  providers: [
    {
      provide: 'drizzleProvider',
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        const dbUrl = configService.get<string>('databaseUrl');
        const poolConnection = createPool({
          uri: dbUrl,
        });
        return drizzle({
          client: poolConnection,
          schema,
          mode: 'default',
          casing: 'snake_case',
        });
      },
    },
  ],
  exports: ['drizzleProvider'],
})
export class DrizzleModule {}
