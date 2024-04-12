import { NextFunction, Request, Response } from "express";
import { Context } from "../context";

export const contextMiddleWare = () => {
  return async (req: Request, res: Response, next: NextFunction) => {
    console.log("binding context");
    Context.bind(req);
    next();
  };
};
