import { Router } from "express";
import { deleteLike, getLikeCount, postLikeFunction } from "../controllers/likeController.js";
import { validateToken }  from "../middleware/validateToken.js"


const router = Router();

router.post('/like', validateToken, postLikeFunction);
router.get('/like/:id', validateToken, getLikeCount);
router.delete('/like/:id', validateToken, deleteLike)

export default router;