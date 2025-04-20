import { type MySql2Database } from 'drizzle-orm/mysql2';
import * as schema from '@/drizzle/schema';

export type MysqlDatabase = MySql2Database<typeof schema>;
