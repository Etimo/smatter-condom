import { Request, Response, Router } from "express";
import { mapToNewUser, save } from "../../repository";
import { validate } from "../validate";
import { NewUserSchema, UserDto } from "./types";

export const createUserRoutes = (): Router => {
  const userRouter = Router();

  userRouter.get("/", (req: Request, res: Response) => {
    console.log("req", req);
    res.send("This is not a user");
  });

  userRouter.post("/", async (req: Request, res: Response) => {
    const validationResult = validate(req.body, NewUserSchema);

    if (!validationResult.success) {
      throw new Error(JSON.stringify(validationResult.errors));
    }

    const saveResult = await save(mapToNewUser(validationResult.result));

    const resultDto: UserDto = {
      id: saveResult._id.toString(),
      email: saveResult.email,
      username: saveResult.username,
      profilePictureUrl: saveResult.profilePictureUrl,
    };

    res.send(resultDto);
  });

  return userRouter;
};
