import { Router } from "express";
import { publishPost, getPosts, deletePost } from "../controllers/postsController.js";
import { validateToken } from "../middleware/validateToken.js";

const postsRouter = Router();

postsRouter.post('/posts', validateToken, publishPost);
postsRouter.get('/posts', validateToken, getPosts);
postsRouter.delete('/posts/:id', validateToken, deletePost)

export default postsRouter;