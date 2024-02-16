import { z } from "zod";

export const UserSchema = z.object({
  id: z.string().uuid(),
  username: z.string(),
  email: z.string().email(),
  profilePictureUrl: z.string().url(),
});

export type UserDto = z.infer<typeof UserSchema>;

export const NewUserSchema = UserSchema.omit({ id: true });
export type NewUserDto = z.infer<typeof NewUserSchema>;
