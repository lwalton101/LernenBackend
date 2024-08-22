import Router from "express";
import {authMiddleware} from "../middleware/authMiddleware";
import {createQuestionRequest} from "../controllers/questionController";

//Creates a new router
const questionRouter = Router();

questionRouter.post("/create", authMiddleware, createQuestionRequest)

//Exports the router for use in other files
export default questionRouter;