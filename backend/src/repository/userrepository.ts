import { IUser, User } from "../model/user";


export async function saveUser(user:IUser) {
    const mongoDoc = new User(user);
    await mongoDoc.save();

    console.log(mongoDoc.email);
  }
