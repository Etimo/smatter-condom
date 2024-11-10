import { Request, Response, Router } from "express";
import { UserRepository } from "../../repository/users/userrepository";
import { requestHandler } from "../request-handler";
import { UserDto } from "./types";

export const createUserRoutes = (): Router => {
  const userRouter = Router();

  userRouter.get(
    "/",
    requestHandler(async (req: Request, res: Response) => {
      const users = await UserRepository.getAll();

      const userDtos: UserDto[] = users.map((user) => {
        return {
          id: user._id.toString(),
          email: user.email,
          username: user.username,
        };
      });

      res.send(userDtos);
    })
  );

  return userRouter;
};
