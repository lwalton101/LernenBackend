import Router from "express";
import {authMiddleware} from "../middleware/authMiddleware";
import {getRatingRequest, uploadRatingRequest} from "../controllers/ratingController";

//Creates a new router
const ratingRouter = Router();

ratingRouter.post("/", authMiddleware, uploadRatingRequest)
ratingRouter.get("/:id", authMiddleware, getRatingRequest)

//Exports the router for use in other files
export default ratingRouter;