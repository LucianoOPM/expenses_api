import { Inject, Injectable } from '@nestjs/common';
import { MysqlDatabase } from '@/types/db.types';
import { users } from '@/drizzle/schema';
import { NewUser, UpdateUser, User } from '@/types/users.types';
import { asc, desc, eq, count, and } from 'drizzle-orm';
import { QueryUserDto } from '@/users/dto/user.dto';

@Injectable()
export class UserRepository {
  constructor(
    @Inject('drizzleProvider') protected readonly db: MysqlDatabase,
  ) {}
  async create(createUserDto: NewUser) {
    return await this.db.insert(users).values(createUserDto).$returningId();
  }

  async update(updateUserDto: UpdateUser, idUser: number) {
    return await this.db
      .update(users)
      .set(updateUserDto)
      .where(eq(users.idUser, idUser));
  }

  async findAll(query: QueryUserDto) {
    const whereConditions = [];
    const limit = query.limit ?? 10;
    const offset = query.page ? (query.page - 1) * limit : 0;
    const orderByColumn = query.orderBy ? users[query.orderBy] : users.idUser;
    const orderDirection =
      query.order?.toLowerCase() === 'desc' ? 'desc' : 'asc';
    const orderBy =
      orderDirection === 'desc' ? desc(orderByColumn) : asc(orderByColumn);

    if (query.firstName) {
      whereConditions.push(eq(users.firstName, query.firstName));
    }
    if (query.lastName) {
      whereConditions.push(eq(users.lastName, query.lastName));
    }
    if (query.email) {
      whereConditions.push(eq(users.email, query.email));
    }
    if (query.role) {
      whereConditions.push(eq(users.role, query.role));
    }
    if (query.isActive !== undefined) {
      const isActive = query.isActive ? true : false;
      whereConditions.push(eq(users.isActive, isActive));
    }

    const [results, total] = await Promise.all([
      this.db.query.users.findMany({
        where: (_users, { and }) => and(...whereConditions),
        limit,
        offset,
        orderBy: [orderBy],
      }),
      this.db
        .select({ count: count() })
        .from(users)
        .where(and(...whereConditions)),
    ]);
    return {
      data: results,
      page: query.page ?? 1,
      limit,
      totalPages: Math.ceil(total[0].count / limit),
    };
  }

  async findByEmail(email: string): Promise<User> {
    return await this.db.query.users.findFirst({
      where: (users, { eq }) => {
        return eq(users.email, email);
      },
    });
  }
  async findById(id: number): Promise<User> {
    return await this.db.query.users.findFirst({
      where: (users, { eq }) => eq(users.idUser, id),
    });
  }
}
