import Router from "express";
import {authMiddleware} from "../middleware/authMiddleware";

//Creates a new router
const searchRouter = Router();

searchRouter.post("/", authMiddleware, searchRouter)

//Exports the router for use in other files
export default searchRouter;