import { Router } from "express";
import { postLikeFunction } from "../controllers/likeController.js";
import { validateToken }  from "../middleware/validateToken.js"


const router = Router();

router.post('/like', validateToken, postLikeFunction);

export default router;