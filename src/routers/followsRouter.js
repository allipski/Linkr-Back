import { Router } from "express";
import { validateToken } from "../middleware/validateToken.js";
import { followUser } from "../controllers/followController.js";
import { unfollowUser } from "../controllers/followController.js";

const followRouter = Router();

followRouter.post('/follow/:userId/follow', validateToken,followUser)
followRouter.post('/follow/:userId/unfollow', validateToken,unfollowUser)

export default followRouter;