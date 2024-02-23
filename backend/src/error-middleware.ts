import { NextFunction, Request, Response } from "express";

export const errorMiddleware = () => {
  return (error: Error, _req: Request, res: Response, next: NextFunction) => {
    console.log("Executing error handling middleware");
    res.status(500).json({ error: "Internal Server Error" });
  };
};
