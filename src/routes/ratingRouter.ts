import Router from "express";
import {authMiddleware} from "../middleware/authMiddleware";
import {uploadRatingRequest} from "../controllers/ratingController";

//Creates a new router
const ratingRouter = Router();

ratingRouter.get("/upload", authMiddleware, uploadRatingRequest)

//Exports the router for use in other files
export default ratingRouter;