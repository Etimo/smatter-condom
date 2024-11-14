import bodyParser from "body-parser";
import { Request, Response, Router } from "express";
import { Types } from "mongoose";
import { getContext } from "../context";
import { requestHandler } from "../controllers/request-handler";
import { validateRequest } from "../controllers/validate";
import { FollowingRepository } from "./followerrepository";
import { FollowingDto, NewFollowingDto } from "./followertypes";

const jsonParser = bodyParser.json();
const followerRouter = Router();

followerRouter.get(
  "/:following",
  requestHandler(async (req: Request, resp: Response) => {
    //Get user ID from context in the future
    const followingId = req.params.following;
    const following = await FollowingRepository.findByFollowingId(
      new Types.ObjectId(followingId)
    );

    const followingDtos = following.map((following) => {
      return {
        id: following._id.toString(),
        followingId: following.followingId,
        followerId: following.owningUserId,
      };
    });

    resp.send(followingDtos);
  })
);

followerRouter.post("/", jsonParser, async (req: Request, resp: Response) => {
  const validationResult = validateRequest(req.body, NewFollowingDto);

  if (!validationResult.success) {
    throw new Error(JSON.stringify(validationResult.errors));
  }
  const context = getContext()

  validationResult.result.owningUserId = context.user._id.toString()
  const saveResult = await FollowingRepository.save(
    //@ts-ignore solve a way of inferrnig objectID from the zod schema, or just pass a string
    FollowingRepository.mapToNew(validationResult.result)
  );
  const resultDto: FollowingDto = {
    id: saveResult._id.toString(),
    owningUserId: saveResult.followingId.toString(),
    followerId: saveResult.owningUserId.toString(),
  };
  return resultDto;
});
