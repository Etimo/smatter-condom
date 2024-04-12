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
      const ctx = Context.get(req);
      const user = ctx.foo;

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
      const userId = "6618d79936ecacf19d3fbe16";
      // const test = new Types.ObjectId(userId)

      if (!validationResult.success) {
        throw new ApiError("bad-request");
      }

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

      const postToDelete = await PostRepository.findById(req.body.id);
      if (
        !postToDelete ||
        (postToDelete.authorId &&
          postToDelete.authorId.toString() !== res.locals.user._id.toString())
      ) {
        throw new ApiError("not-found");
      }

      await PostRepository.deletePost(req.body.id);

      res.status(204).send();
    })
  );

  return postRouter;
};
