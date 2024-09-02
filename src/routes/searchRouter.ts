import Router from "express";
import {authMiddleware} from "../middleware/authMiddleware";
import {searchRequest} from "../controllers/searchController";

//Creates a new router
const searchRouter = Router();

searchRouter.post("/", authMiddleware, searchRequest)

//Exports the router for use in other files
export default searchRouter;