import { NextFunction, Router , Request, Response} from "express";
import { requestHandler } from "../../controller-function";
import { fo}


const followerRouter =  Router();
  followerRouter.get(
    "/:user",requestHandler(async (req:Request, resp: Response) => {
      const users = await UserRepository.getAll();

      const userDtos = users.map((user) => {
        return {
          id: user._id.toString(),
          email: user.email,
          username: user.username,
          profilePictureUrl: user.profilePictureUrl,
        };
      });

      res.send(userDtos);
    })
  );