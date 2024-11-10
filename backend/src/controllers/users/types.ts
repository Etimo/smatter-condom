import { z } from "zod";
import { isObjectId } from "../../utils/object-id-regex";

export const UserSchema = z.object({
  id: z
    .string()
    .uuid()
    .refine((id) => isObjectId(id), { message: "Invalid ObjectId" }),
  username: z.string(),
  email: z.string().email(),
});

export type UserDto = z.infer<typeof UserSchema>;

export const NewUserSchema = UserSchema.omit({ id: true });
export type NewUserDto = z.infer<typeof NewUserSchema>;
