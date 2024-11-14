import { Request, Response, Router } from "express";
import { getContext } from "../../context";
import { ApiError } from "../../errors";
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

  userRouter.get(
    "/:id",
    requestHandler(async (req: Request, res: Response) => {
      const user = await UserRepository.getById(req.params.id);

      if (!user) {
        throw new ApiError("not-found");
      }

      const userDto = {
        id: user._id.toString(),
        email: user.email,
        username: user.username,
        isMyself: user._id.toString() === getContext().user._id.toString(),
      };

      res.send(userDto);
    })
  );

  return userRouter;
};
