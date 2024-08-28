import Router from "express";
import {authMiddleware} from "../middleware/authMiddleware";
import {getResultRequest, submitResultRequest} from "../controllers/resultController";

//Creates a new router
const resultRouter = Router();

resultRouter.post("/submit", authMiddleware, submitResultRequest)
resultRouter.get("/:id/get", authMiddleware, getResultRequest)

//Exports the router for use in other files
export default resultRouter;