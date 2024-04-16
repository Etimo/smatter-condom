import { NextFunction, Request, Response } from "express";
import { setContext } from "../context";
import { UserRepository } from "../repository";
import { fromBase64 } from "../utils/base64-helper";

export const authMiddleWare = () => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const sessionCookie = req.headers["cookie"];

    if (!sessionCookie) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const sessionCookieMatch = sessionCookie.match(/session=([^;].+)/);

    if (!sessionCookieMatch) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const userId = fromBase64(sessionCookieMatch[1]);
    const user = await UserRepository.getById(userId);
    if (!user) {
      console.log(`No user with id ${userId} in db`);
      return res.status(401).json({ error: "Unauthorized" });
    }

    setContext({ user });
    next();
  };
};
