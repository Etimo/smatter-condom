import { Request, Response, Router } from "express";
import { Context } from "../../context";
import { requestHandler } from "../../controller-function";
import { ApiError } from "../../errors";
import { Post } from "../../model/post";
import { PostRepository } from "../../repository";
import { validateId, validateRequest } from "../validate";
import { NewPostDtoSchema, PostDto } from "./types";

export const createPostRoutes = (): Router => {
  const postRouter = Router();

  postRouter.get(
    "/",
    requestHandler(async (req: Request, res: Response) => {
      const ctx = Context.getInstance();
      const user = ctx.user;

      console.log("user", user);

      const posts = await PostRepository.getAll();
      const postDtos: PostDto[] = posts.map((user) => {
        return {
          id: user._id.toString(),
          content: user.content,
          authorId: user.authorId?.toString(),
        };
      });

      res.send(postDtos);
    })
  );

  postRouter.post(
    "/",
    requestHandler(async (req: Request, res: Response) => {
      const validationResult = validateRequest(req.body, NewPostDtoSchema);
      if (!validationResult.success) {
        throw new ApiError("bad-request");
      }

      const ctx = Context.getInstance();
      const userId = ctx.user._id;

      const newPost = new Post({
        ...validationResult.result,
        authorId: userId,
      });
      const saveResult = await PostRepository.save(newPost);

      const resultDto: PostDto = {
        id: saveResult._id.toString(),
        content: saveResult.content,
        authorId: saveResult.authorId?.toString(),
      };

      res.send(resultDto);
    })
  );

  postRouter.delete(
    "/",
    requestHandler(async (req: Request, res: Response) => {
      const validId = validateId(req.body.id);
      if (!validId) {
        throw new ApiError("bad-request");
      }

      const ctx = Context.getInstance();
      const userId = ctx.user._id;

      const postToDelete = await PostRepository.findById(req.body.id);
      if (
        !postToDelete ||
        postToDelete.authorId?.toString() !== userId.toString()
      ) {
        throw new ApiError("not-found");
      }

      await PostRepository.deletePost(req.body.id);

      res.status(204).send();
    })
  );

  return postRouter;
};
