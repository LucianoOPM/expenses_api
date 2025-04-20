import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { type ZodError, ZodSchema } from 'zod';

export function formatZodError(error: ZodError) {
  return {
    errors: error.errors.reduce(
      (acc, err) => {
        const field = err.path.join('.');
        acc[field] = err.message;
        return acc;
      },
      {} as Record<string, string>,
    ),
  };
}

@Injectable()
export class ZodValidationPipe implements PipeTransform {
  constructor(private schema: ZodSchema<any>) {}
  transform(value: unknown) {
    const result = this.schema.safeParse(value);
    if (!result.success) {
      throw new BadRequestException(formatZodError(result.error));
    }
    return result.data;
  }
}
