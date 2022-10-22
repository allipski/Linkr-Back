import { Router } from "express";
import { getUser } from "../controllers/searchController.js";


const searchRouter = Router();

searchRouter.get("/users:userId", getUser)
searchRouter.get("/search/:name", getUser)

export default searchRouter;