import { IUser } from "./model/user";

export class Context {
  private static instance: Context;
  private constructor() {}
  public static getInstance(): Context {
    if (!Context.instance) {
      Context.instance = new Context();
    }
    return Context.instance;
  }

  private _user: IUser | null = null;

  public set user(user: IUser) {
    if (this._user) {
      throw new Error("User already set");
    }
    this._user = user;
  }

  public get user(): IUser {
    if (!this._user) throw new Error("User not set");
    return this._user!;
  }
}
