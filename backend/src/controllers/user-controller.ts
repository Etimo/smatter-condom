import { Request, Response, Router } from "express";
import { ZodSchema } from "zod";
import { NewUserSchema } from "./types";

export const createUserRoutes = (): Router => {
  const userRouter = Router();

  userRouter.get("/", (req: Request, res: Response) => {
    console.log("req", req);
    res.send("This is not a user");
  });

  userRouter.post("/", (req: Request, res: Response) => {
    console.log("req", req);

    // we expect the body to contain a newUserDto

    const newUserDto = validate(req.body, NewUserSchema);

    res.send("This is not a user");
  });

  return userRouter;
};

type Error = {
  message: string;
};

const validate = <T>(body: any, schema: ZodSchema): Error[] | any => {
  const errors: Error[] = [];

  const parseResult = schema.safeParse(body);

  if (parseResult.success) {
    return parseResult.data;
  }

  const zodErrors = parseResult.error.errors;

  zodErrors.forEach((error) => {
    errors.push({ message: error.message });
  });

  return errors;
};
