import Router from "express";
import {getUserByIDRequest} from "../controllers/userController";
import {authMiddleware} from "../middleware/authMiddleware";

//Creates a new router
const userRouter = Router();

userRouter.get("/:id", authMiddleware, getUserByIDRequest)

//Exports the router for use in other files
export default userRouter;