import Router from "express";
import {authMiddleware} from "../middleware/authMiddleware";
import {createQuestionRequest, updateQuestionRequest} from "../controllers/questionController";

//Creates a new router
const questionRouter = Router();

questionRouter.post("/create", authMiddleware, createQuestionRequest)
questionRouter.post("/:id/update", authMiddleware, updateQuestionRequest)

//Exports the router for use in other files
export default questionRouter;