import bcrypt from "bcrypt";
import { Request, Response, Router } from "express";
import { z } from "zod";
import { ApiError } from "../../errors";
import { UserRepository } from "../../repository/users/userrepository";
import { toBase64 } from "../../utils/base64-helper";
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

        if (!user) throw new ApiError("unauthorized");

        const passwordMatch = await bcrypt.compare(
          validationResult.result.password,
          user.password
        );

        if (!passwordMatch) {
          throw new ApiError("unauthorized");
        }

        const sessionToken = toBase64(user.id);

        res.cookie("session", sessionToken, {
          httpOnly: true, // revent JavaScript access to the cookie
          secure: true, // only sent over HTTPS
          sameSite: "strict", // protect against CSRF
          maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
        });

        res.send({
          username: user.username,
          email: user.email,
        });
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

        res.send({
          email: validationResult.result.email,
          username: validationResult.result.username,
        });
      },
      { isPublic: true }
    )
  );

  return authRouter;
};
