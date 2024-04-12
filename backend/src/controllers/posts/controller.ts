import { Request, Response, Router } from "express";
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
      const posts = await PostRepository.getAll();
      const postDtos: PostDto[] = posts.map((user) => {
        return {
          id: user._id.toString(),
          content: user.content,
          authorId: user.authorId.toString(),
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

      console.log("validationResult", validationResult);

      if (!validationResult.success) {
        throw new ApiError("bad-request");
      }

      const newPost = new Post({
        ...validationResult.result,
        authorId: userId,
      });
      const saveResult = await PostRepository.save(newPost);

      console.log("saveResult", saveResult);

      const resultDto: PostDto = {
        id: saveResult._id.toString(),
        content: saveResult.content,
        authorId: saveResult.authorId.toString(),
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

      const userId = "6618d79936ecacf19d3fbe16";
      // const test = new Types.ObjectId(userId)

      // const saveResult = await PostRepository.save(newPost);

      // console.log("saveResult", saveResult);

      // const resultDto: PostDto = {
      //   id: saveResult._id.toString(),
      //   content: saveResult.content,
      //   authorId: saveResult.authorId.toString(),
      // };

      res.status(204).send();
    })
  );

  return postRouter;
};
