import { z } from "zod";
import { isObjectId } from "../../utils";

export const PostSchema = z.object({
  id: z
    .string()
    .refine((id) => isObjectId(id), { message: "Invalid ObjectId" }),
  content: z.string(),
  authorId: z
    .string()
    .refine((id) => isObjectId(id), { message: "Invalid ObjectId" })
    .optional(),
});

export type PostDto = z.infer<typeof PostSchema>;

export const NewPostDtoSchema = PostSchema.omit({ id: true, authorId: true });
export type NewPostDto = z.infer<typeof NewPostDtoSchema>;
