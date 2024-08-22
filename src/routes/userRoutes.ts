import Router from "express";
import {getSelfRequest, getUserByIDRequest} from "../controllers/userController";
import {authMiddleware} from "../middleware/authMiddleware";

//Creates a new router
const userRouter = Router();

userRouter.get("/:id", authMiddleware, getUserByIDRequest)
userRouter.get("/", authMiddleware, getSelfRequest)

//Exports the router for use in other files
export default userRouter;