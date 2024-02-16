import { z } from "zod";
import { isObjectId } from "../../utils";

export const UserSchema = z.object({
  id: z
    .string()
    .uuid()
    .refine((id) => isObjectId(id), { message: "Invalid ObjectId" }),
  username: z.string(),
  email: z.string().email(),
  profilePictureUrl: z.string().url().optional(),
});

export type UserDto = z.infer<typeof UserSchema>;

export const NewUserSchema = UserSchema.omit({ id: true });
export type NewUserDto = z.infer<typeof NewUserSchema>;
