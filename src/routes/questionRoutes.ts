import Router from "express";
import {authMiddleware} from "../middleware/authMiddleware";
import {
    browseRequest,
    createQuestionRequest,
    getAllQuestionsByUserRequest,
    getQuestionRequest,
    updateQuestionRequest
} from "../controllers/questionController";

//Creates a new router
const questionRouter = Router();

questionRouter.get("/browse/:amount", authMiddleware, browseRequest)
questionRouter.post("/create", authMiddleware, createQuestionRequest)
questionRouter.post("/:id/update", authMiddleware, updateQuestionRequest)
questionRouter.get("/:id", authMiddleware, getQuestionRequest)
questionRouter.get("/user/:id", authMiddleware, getAllQuestionsByUserRequest)


//Exports the router for use in other files
export default questionRouter;