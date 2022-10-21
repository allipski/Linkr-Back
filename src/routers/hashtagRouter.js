import { Router } from "express";
import { getHashtagPost, getTrendingHashtags } from "../controllers/hashtagController.js";

const router = Router();

router.get('/hashtags', getTrendingHashtags);
router.get('/hashtags/:hashtag', getHashtagPost);

export default router;