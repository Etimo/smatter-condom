import { NextFunction, Request, Response } from "express";
import { UserRepository } from "../repository";
import { fromBase64 } from "../utils/base64-helper";

export const contextMiddleware = () => {
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
      return res.status(401).json({ error: "Unauthorized" });
    }

    // http://expressjs.com/en/api.html#res.locals
    res.locals.user = user;
    next();
  };
};
