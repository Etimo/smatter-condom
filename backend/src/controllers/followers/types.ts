import { z } from "zod";
import { isObjectId } from "../../utils";

export const followerSchema = z.object({
  id: z
    .string()
    .refine((id) => isObjectId(id), { message: "Invalid ObjectId" }),
  followerId: z
    .string()
    .refine((id) => isObjectId(id), { message: "Invalid ObjectId" }),
  followingId: z
    .string()
    .refine((id) => isObjectId(id), { message: "Invalid ObjectId" }),
});

export const NewFollowingDto = followerSchema.omit({ id: true });
export type NewFollowingDto = z.infer<typeof NewFollowingDto>;
export type FollowingDto = z.infer<typeof followerSchema>;
