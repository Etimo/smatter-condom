import { z } from "zod";
import { isObjectId } from "../../utils";

export const PostSchema = z.object({
  id: z
    .string()
    .refine((id) => isObjectId(id), { message: "Invalid ObjectId" }),
  content: z.string(),
  authorId: z
    .string()
    .refine((id) => isObjectId(id), { message: "Invalid ObjectId" }),
});

export type PostDto = z.infer<typeof PostSchema>;

export const NewPostSchema = PostSchema.omit({ id: true });
export type NewPostDto = z.infer<typeof NewPostSchema>;
