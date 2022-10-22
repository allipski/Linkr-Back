import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import authRouter from './routers/authRouter.js'
import likeRouter from "./routers/likeRoutes.js"
import hashtagRouter from './routers/hashtagRouter.js';
import searchRouter from "./routers/searchRouter.js"
import postsRouter from "./routers/postsRouter.js"

dotenv.config();

const server = express();
server.use(express.json());
server.use(cors());

server.use(authRouter);
server.use(likeRouter);
server.use(hashtagRouter);
server.use(postsRouter);
server.use(searchRouter);

const PORT = process.env.PORT;

server.listen(PORT || 4000,()=>{
    console.log(`Server listening on port ${process.env.PORT}`);
});
