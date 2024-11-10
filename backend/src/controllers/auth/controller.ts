import bcrypt from "bcrypt";
import { Request, Response, Router } from "express";
import { z } from "zod";
import { ApiError } from "../../errors";
import { UserRepository } from "../../repository/users/userrepository";
import { requestHandler } from "../request-handler";
import { validateRequest } from "../validate";

export const createAuthRoutes = (): Router => {
  const authRouter = Router();

  authRouter.post(
    "/login",
    requestHandler(
      async (req: Request, res: Response) => {
        const schema = z.object({
          email: z.string().email(),
          password: z.string().min(6),
        });

        const validationResult = validateRequest(req.body, schema);

        if (!validationResult.success) {
          throw new ApiError("bad-request");
        }

        const user = await UserRepository.getByEmail(
          validationResult.result.email
        );

        console.log(user);

        if (!user) throw new ApiError("unauthorized");

        const passwordMatch = await bcrypt.compare(
          validationResult.result.password,
          user.password
        );

        if (!passwordMatch) {
          throw new ApiError("unauthorized");
        }

        res.send(true);
      },
      { isPublic: true }
    )
  );

  authRouter.post(
    "/signup",
    requestHandler(
      async (req: Request, res: Response) => {
        const schema = z.object({
          email: z.string().email(),
          password: z.string().min(6),
          username: z.string().max(20),
        });

        const validationResult = validateRequest(req.body, schema);

        if (!validationResult.success) {
          throw new ApiError("bad-request");
        }

        const hashedPassword = await bcrypt.hash(
          validationResult.result.password,
          10
        );

        await UserRepository.create({
          username: validationResult.result.username,
          email: validationResult.result.email,
          password: hashedPassword,
        });

        res.send(true);
      },
      { isPublic: true }
    )
  );

  return authRouter;
};
