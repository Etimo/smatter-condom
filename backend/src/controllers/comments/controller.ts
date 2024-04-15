import bodyParser from "body-parser";
import { Request, Response, Router } from "express";
import { validateRequest } from "../validate";
import { NewCommentDto, CommentDto } from "./types";
import { CommentRepository } from "backend/src/repository/comments";

const jsonParser = bodyParser.json();

export const createPostRoutes = (): Router => {
  const postRouter = Router();

  postRouter.get("/", jsonParser, async (req: Request, res: Response) => {
    console.log("req", req.body);
    const posts = await CommentRepository.getAll();
    const postDtos: CommentDto[] = posts.map((user) => {
      return {
        id: user._id.toString(),
        content: user.content,
        authorId: user.authorId.toString(),
        postId: user.postId.toString()
      };
    });

    res.send(postDtos);
  });

  postRouter.post("/", jsonParser, async (req: Request, res: Response) => {
    const validationResult = validateRequest(req.body, NewCommentDto);

    if (!validationResult.success) {
      throw new Error(JSON.stringify(validationResult.errors));
    }

    const saveResult = await CommentRepository.save(
      CommentRepository.mapToNew(validationResult.result)
    );

    const resultDto: CommentDto = {
      id: saveResult._id.toString(),
      content: saveResult.content,
      authorId: "",
    };

    res.send(resultDto);
  });

  return postRouter;
};
