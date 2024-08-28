import Router from "express";
import {authMiddleware} from "../middleware/authMiddleware";
import {submitResultRequest} from "../controllers/resultController";

//Creates a new router
const resultRouter = Router();

resultRouter.post("/submit", authMiddleware, submitResultRequest)

//Exports the router for use in other files
export default resultRouter;