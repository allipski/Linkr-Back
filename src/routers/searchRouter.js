import { Router } from "express";
import { getUser,getUserPage } from "../controllers/searchController.js";
import { validateToken } from "../middleware/validateToken.js";


const searchRouter = Router();

searchRouter.get("/users/:id",validateToken,getUserPage)
searchRouter.get("/search/:name",validateToken, getUser)

export default searchRouter;