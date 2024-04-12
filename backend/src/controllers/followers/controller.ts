import bodyParser from "body-parser";
import { Request, Response, Router } from "express";
import { Types } from "mongoose";
import { requestHandler } from "../../controller-function";
import { FollowingRepository } from "../../repository/following/followingrepository";
import { validateRequest } from "../validate";
import { FollowingDto, NewFollowingDto } from "./types";


const jsonParser = bodyParser.json();
const followerRouter =  Router();

  followerRouter.get(
    "/:following",requestHandler(async (req:Request, resp: Response) => {
      //Get user ID from context in the future
      const followingId = req.params.following;
      const following = await FollowingRepository.findByFollowingId(new Types.ObjectId(followingId));

      const followingDtos = following.map((following) => {
        return {
          id: following._id.toString(),
          followingId: following.followingId,
          followerId: following.followerId,
        };
      });

      resp.send(followingDtos);
    })
  );
  followerRouter.post("/", jsonParser, async (req:Request, resp: Response) => {
    const validationResult = validateRequest(req.body, NewFollowingDto);
    if (!validationResult.success) {
      throw new Error(JSON.stringify(validationResult.errors));
    }

    const saveResult = await FollowingRepository.save(
      FollowingRepository.mapToNew(validationResult.result)
    );
   const resultDto: FollowingDto = {
      id: saveResult._id.toString(),
      followingId: saveResult.followingId.toString(),
      followerId: saveResult.followerId.toString()
    };
  return resultDto;
  });
