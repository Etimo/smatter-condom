import { Request } from "express";
import { IUser } from "./model/user";

export class Context {
  static _bindings = new WeakMap<Request, Context>();

  public foo!: IUser;

  constructor() {}

  static bind(req: Request): void {
    const ctx = new Context();
    Context._bindings.set(req, ctx);
  }

  static get(req: Request): Context {
    return Context._bindings.get(req)!;
  }
}
