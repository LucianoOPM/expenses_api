import {
  mysqlTable,
  serial,
  varchar,
  mysqlEnum,
  boolean,
} from 'drizzle-orm/mysql-core';

export const users = mysqlTable('users', {
  idUser: serial('id_user').primaryKey(),
  firstName: varchar('first_name', { length: 100 }).notNull(),
  lastName: varchar('last_name', { length: 100 }).notNull(),
  email: varchar('email', { length: 255 }).notNull().unique(),
  password: varchar('password', { length: 100 }).notNull(),
  role: mysqlEnum('role', ['USER', 'ADMIN']).default('USER'),
  isActive: boolean('is_active').default(true),
});
