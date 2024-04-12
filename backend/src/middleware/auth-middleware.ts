import { NextFunction, Request, Response } from "express";
import { Context } from "../context";
import { UserRepository } from "../repository";
import { fromBase64 } from "../utils/base64-helper";

export const authMiddleWare = () => {
  return async (req: Request, res: Response, next: NextFunction) => {
    console.log("auth middleware");
    const sessionCookie = req.headers["cookie"];
    console.log(sessionCookie);

    if (!sessionCookie) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    console.log("1");

    const sessionCookieMatch = sessionCookie.match(/session=([^;].+)/);
    console.log(sessionCookieMatch);

    if (!sessionCookieMatch) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    console.log("2");

    const userId = fromBase64(sessionCookieMatch[1]);

    console.log(userId);

    const user = await UserRepository.getById(userId);
    if (!user) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    console.log("3");

    const ctx = Context.get(req);
    ctx.foo = user;

    console.log("ctx", ctx);

    next();
  };
};
