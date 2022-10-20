import { Router } from "express";
import { getUser } from "../controllers/searchController.js";


const searchRouter = Router();

searchRouter.get("/users:userId", getUser)

export default searchRouter;