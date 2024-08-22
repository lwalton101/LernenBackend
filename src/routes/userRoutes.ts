import Router from "express";
import {getUserByIDRequest} from "../controllers/userController";

//Creates a new router
const userRouter = Router();

userRouter.get("/:id", getUserByIDRequest)

//Exports the router for use in other files
export default userRouter;