import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import authRouter from './routers/authRouter.js'
import likeRouter from "./routers/likeRoutes.js"
import hashtagRouter from './routers/hashtagRouter.js';
import searchRouter from "./routers/searchRouter.js"
import postsRouter from "./routers/postsRouter.js"
import followsRouter from "./routers/followsRouter.js"

dotenv.config();

const server = express();
server.use(cors());
server.use(express.json());

server.use(authRouter);
server.use(likeRouter);
server.use(hashtagRouter);
server.use(postsRouter);
server.use(searchRouter);
server.use(followsRouter);

const PORT = process.env.PORT;

server.listen(PORT, ()=>{
    console.log(`Server listening on port ${process.env.PORT}`);
});
