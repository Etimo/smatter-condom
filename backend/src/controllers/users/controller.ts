import { Request, Response, Router } from "express";
import { getContext } from "../../context";
import { ApiError } from "../../errors";
import { UserRepository } from "../../repository/users/userrepository";
import { requestHandler } from "../request-handler";
import { validateRequest } from "../validate";
import { UpdateUserSchema, UserDto } from "./types";

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
        bio: user.bio,
        profilePictureUrl: user.profilePictureUrl,
        bannerPictureUrl: user.bannerPictureUrl,
        displayName: user.displayName,
        isMyself: user._id.toString() === getContext().user._id.toString(),
      };

      res.send(userDto);
    })
  );

  userRouter.put(
    "/:id",
    requestHandler(async (req: Request, res: Response) => {
      const validationResult = validateRequest(req.body, UpdateUserSchema);

      if (!validationResult.success) throw new ApiError("bad-request");

      const user = await UserRepository.getById(req.params.id);

      if (!user) {
        throw new ApiError("not-found");
      }

      if (req.params.id !== getContext().user._id.toString()) {
        throw new ApiError("bad-request");
      }

      const updatedUser = await UserRepository.updateById(
        req.params.id,
        req.body
      );

      res.send(updatedUser);
    })
  );

  return userRouter;
};
