import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
const DrizzleAsyncProvider = "drizzleProvider";
import { createPool } from 'mysql2/promise'
import * as schema  from './schema'
import { drizzle } from 'drizzle-orm/singlestore/driver';

@Module({
    imports: [ConfigModule],
    providers: [{
        provide: DrizzleAsyncProvider,
        inject: [ConfigService],
        useFactory: async (configService: ConfigService) => {
            const dbUrl = configService.get<string>('databaseUrl');
            const poolConnection = createPool({
                uri: dbUrl
            })
            return drizzle(poolConnection, { schema })
        }
    }],
    exports: [DrizzleAsyncProvider]
})
export class DrizzleModule {}
