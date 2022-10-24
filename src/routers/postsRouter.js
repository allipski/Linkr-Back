import express from 'express'
import { publishPost, getPosts } from "../controllers/postsController.js";


const postsRouter = express.Router();

postsRouter.post('/posts', publishPost);
postsRouter.get('/posts', getPosts);

export default postsRouter;