import { ZodSchema } from "zod";

type Error = {
  message: string;
};

export const validate = <T>(
  body: any,
  schema: ZodSchema<T>
): { success: boolean } & (
  | { success: false; errors: Error[] }
  | { success: true; result: T }
) => {
  const errors: Error[] = [];

  const parseResult = schema.safeParse(body);
  if (parseResult.success) {
    return { success: true, result: parseResult.data };
  }

  parseResult.error.errors.forEach((error) => {
    errors.push({ message: error.message });
  });

  return { success: false, errors };
};
