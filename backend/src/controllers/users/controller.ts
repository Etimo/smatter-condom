import { Request, Response, Router } from "express";
import { requestHandler } from "../../controller-function";
import { UserRepository } from "../../repository";
import { validateRequest } from "../validate";
import { NewUserSchema, UserDto } from "./types";

export const createUserRoutes = (): Router => {
  const userRouter = Router();

  userRouter.get(
    "/",
    requestHandler(async (req: Request, res: Response) => {
      const users = await UserRepository.getAll();

      const userDtos = users.map((user) => {
        return {
          id: user._id.toString(),
          email: user.email,
          username: user.username,
          profilePictureUrl: user.profilePictureUrl,
        };
      });

      res.send(userDtos);
    })
  );

  userRouter.post(
    "/",
    requestHandler(async (req: Request, res: Response) => {
      const validationResult = validateRequest(req.body, NewUserSchema);

      if (!validationResult.success) {
        throw new Error(JSON.stringify(validationResult.errors));
      }

      const saveResult = await UserRepository.save(
        UserRepository.mapToNew(validationResult.result)
      );

      const resultDto: UserDto = {
        id: saveResult._id.toString(),
        email: saveResult.email,
        username: saveResult.username,
        profilePictureUrl: saveResult.profilePictureUrl,
      };

      res.send(resultDto);
    })
  );

  return userRouter;
};
