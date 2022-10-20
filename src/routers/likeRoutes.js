import { Router } from "express";
import { likeFunction } from "../controllers/likeController.js";
import { validateToken }  from "../middleware/validateToken.js"


const router = Router();

router.post('/like', validateToken, likeFunction);

export default router;