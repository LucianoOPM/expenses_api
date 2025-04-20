export type UserRole = 'USER' | 'ADMIN';

export interface User {
  idUser: number;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: UserRole;
  isActive: boolean;
}

export interface NewUser extends Omit<User, 'idUser' | 'role' | 'isActive'> {
  role?: UserRole;
  isActive?: boolean;
}

export interface UpdateUser
  extends Partial<Omit<NewUser, 'email' | 'password'>> {}

export interface NoPasswordUser extends Omit<User, 'password'> {}
