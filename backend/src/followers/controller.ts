import { Request, Response, Router } from "express";
import { Types } from "mongoose";
import { getContext } from "../context";
import { requestHandler } from "../controllers/request-handler";
import { isObjectId } from "../utils/object-id-regex";
import { IFollowing } from "./followermodel";
import { FollowingRepository } from "./followerrepository";

const followerRouter = Router();

const checkQueryParamObjectId = (param: any): boolean => {
  return !(typeof(param) !== "string" || !isObjectId(param))
}
export const createFollowerRoutes = ():Router => {
  followerRouter.get(
    "/",
    requestHandler(async (req: Request, resp: Response) => {
      //Get user ID from context in the future
      const ownerQuery = req.query.owningUserId;
      const followerQuery = req.query.followingId;

      console.log(req.params)
      //Validate any set query arguments
      if(ownerQuery && !checkQueryParamObjectId(ownerQuery) ||
       followerQuery && !checkQueryParamObjectId(followerQuery)) {
        resp.status(400).send({errorMessage: "Parameters must be valid objectIds"})
        return;
      }

      var following:IFollowing[]  = [];
      if(ownerQuery && typeof(ownerQuery) ===  "string") {
              following = await FollowingRepository.findByOwnerId(new Types.ObjectId(ownerQuery))
      }
      if(followerQuery && typeof(followerQuery) ===  "string") {
              following = await FollowingRepository.findByFollowingId(new Types.ObjectId(followerQuery))
      }


      const followingDtos = following.map((following) => {
        return {
          id: following._id.toString(),
          followingId: following.followingId,
          owningUserId: following.owningUserId,
        };
      });

      resp.send(followingDtos);
    })
  );


  followerRouter.post("/", requestHandler(async (req: Request, resp: Response) => {


    const followingId = req.body?.followingId

    //TODO: Validate user exists
    if (typeof(followingId) !== "string" || !isObjectId(followingId) ) {
      resp.status(400).send("Input should be valid userId")
      return
    }
    const context = getContext()
    const owningUserId = context.user._id.toString()
    const saveResult = await FollowingRepository.save(
      //@ts-ignore solve a way of inferrnig objectID from the zod schema, or just pass a string
      {followingId: followingId, owningUserId: owningUserId,_id: new Types.ObjectId()});
    const resultDto = {
      id: saveResult._id.toString(),
      followingId: saveResult.followingId.toString(),
      owningUserId: saveResult.owningUserId.toString(),
    };
     resp.send(resultDto);
  }));

  followerRouter.post("/unfollow", requestHandler(async (req: Request, resp: Response) => {
    const followingId = req.body?.followingId
    //TODO: Validate user exists
    if (typeof(followingId) !== "string" || !isObjectId(followingId) ) {
      resp.status(400).send("Input should be valid userId")
      return
    }
    const context = getContext()
    const owningUserId = context.user._id.toString()
    const saveResult = await FollowingRepository.deleteByOwnerIdAndFollowingId(new Types.ObjectId(owningUserId), new Types.ObjectId(followingId))
     resp.send({message: `removed ${followingId}`});
  }));




return followerRouter;
}
