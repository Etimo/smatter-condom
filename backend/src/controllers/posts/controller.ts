import bodyParser from "body-parser";
import { Request, Response, Router } from "express";
import { PostRepository } from "../../repository";
import { validateRequest } from "../validate";
import { NewPostSchema, PostDto } from "./types";

const jsonParser = bodyParser.json();

export const createPostRoutes = (): Router => {
  const postRouter = Router();

  postRouter.get("/", jsonParser, async (req: Request, res: Response) => {
    console.log("req", req.body);
    const posts = await PostRepository.getAll();
    const postDtos: PostDto[] = posts.map((user) => {
      return {
        id: user._id.toString(),
        content: user.content,
        authorId: user.authorId.toString(),
      };
    });

    res.send(postDtos);
  });

  postRouter.post("/", jsonParser, async (req: Request, res: Response) => {
    const validationResult = validateRequest(req.body, NewPostSchema);

    if (!validationResult.success) {
      throw new Error(JSON.stringify(validationResult.errors));
    }

    const saveResult = await PostRepository.save(
      PostRepository.mapToNew(validationResult.result)
    );

    const resultDto: PostDto = {
      id: saveResult._id.toString(),
      content: saveResult.content,
      authorId: "",
    };

    res.send(resultDto);
  });

  return postRouter;
};
