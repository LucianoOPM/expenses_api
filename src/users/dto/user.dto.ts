import { z } from 'zod';

const emailRegExp =
  /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/i;

const passwordRegExp = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;

export const CreateUserSchema = z.object({
  firstName: z.string({
    required_error: 'First name is required',
    invalid_type_error: 'First name must be a string',
  }),
  lastName: z.string({
    required_error: 'Last name is required',
    invalid_type_error: 'Last name must be a string',
  }),
  email: z
    .string({
      required_error: 'Email is required',
      invalid_type_error: 'Email must be a string',
    })
    .regex(emailRegExp, { message: 'Invalid email' }),
  password: z
    .string({
      required_error: 'Password is required',
      invalid_type_error: 'Password must be a string',
    })
    .regex(passwordRegExp, { message: 'Invalid password' })
    .min(8, { message: 'Password must be at least 8 characters long' }),
  role: z
    .enum(['USER', 'ADMIN'], {
      message: "User role should be either 'USER' or 'ADMIN'",
    })
    .optional(),
  isActive: z.boolean({ message: 'isActive must be a boolean' }).optional(),
});

export const QueryUserSchema = z.object({
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  email: z.string().optional(),
  role: z
    .enum(['USER', 'ADMIN'], {
      message: 'User role should be either "USER" or "ADMIN"',
    })
    .optional(),
  limit: z.coerce.number().optional(),
  page: z.coerce.number().optional(),
  isActive: z.coerce.number().int().optional(),
  orderBy: z
    .enum(['firstName', 'lastName', 'email', 'role'], {
      message: 'Invalid orderBy',
    })
    .optional(),
  order: z.enum(['asc', 'desc'], { message: 'Invalid order' }).optional(),
});

export const UpdateUserSchema = z.object({
  firstName: z.string({ message: 'name must be a string' }).optional(),
  lastName: z.string({ message: 'name must be a string' }).optional(),
  role: z
    .enum(['USER', 'ADMIN'], {
      message: 'User role should be either "USER" or "ADMIN"',
    })
    .optional(),
  isActive: z.boolean({ message: 'isActive must be a boolean' }).optional(),
  password: z
    .string({ message: 'Password must be a string' })
    .regex(passwordRegExp, { message: 'Invalid password' })
    .optional(),
});

export type CreateUserDto = z.infer<typeof CreateUserSchema>;
export type QueryUserDto = z.infer<typeof QueryUserSchema>;
export type UpdateUserDto = z.infer<typeof UpdateUserSchema>;
