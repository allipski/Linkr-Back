import { Router } from "express";
import { validateToken } from "../middleware/validateToken.js";
import { followUser,unfollowUser } from "../controllers/followController.js";


const router = Router();

router.post("/follow/:userId/follow",validateToken,followUser);
router.post("/follow/:userId/unfollow",validateToken,unfollowUser);

export default router;