import bodyParser from "body-parser";
import { Request, Response, Router } from "express";
import { PostRepository } from "../../repository";

const jsonParser = bodyParser.json();

export const createPostRoutes = (): Router => {
  const postRouter = Router();

  postRouter.get("/", async (req: Request, res: Response) => {
    const posts = await PostRepository.getAll();

    // const postDtos = posts.map((user) => {
    //   return {
    //     id: user._id.toString(),
    //     email: user.email,
    //     username: user.username,
    //     profilePictureUrl: user.profilePictureUrl,
    //   };
    // });

    res.send({});
  });

  // postRouter.post("/", jsonParser, async (req: Request, res: Response) => {
  //   const validationResult = validateRequest(req.body, NewUserSchema);

  //   if (!validationResult.success) {
  //     throw new Error(JSON.stringify(validationResult.errors));
  //   }

  //   const saveResult = await UserRepository.save(
  //     UserRepository.mapToNew(validationResult.result)
  //   );

  //   const resultDto: UserDto = {
  //     id: saveResult._id.toString(),
  //     email: saveResult.email,
  //     username: saveResult.username,
  //     profilePictureUrl: saveResult.profilePictureUrl,
  //   };

  //   res.send(resultDto);
  // });

  return postRouter;
};
