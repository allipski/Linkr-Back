import './setup.js'
import express from "express";
import cors from "cors";
import likeRouter from "./routes/likeRoutes.js"


const app = express();
app.use(cors());
app.use(express.json());

app.use(likeRouter);

app.listen(process.env.PORT, () => console.log(`Server is listening on port ${process.env.PORT}!`));