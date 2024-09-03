import Router from "express";
import {getSelfRequest, getUserByIDRequest, updateProfilePicRequest} from "../controllers/userController";
import {authMiddleware} from "../middleware/authMiddleware";
import {pfpUpload} from "../file";

//Creates a new router
const userRouter = Router();

userRouter.get("/:id", authMiddleware, getUserByIDRequest)
userRouter.get("/", authMiddleware, getSelfRequest)
userRouter.post("/update/pfp", authMiddleware, pfpUpload.single("pfp"), updateProfilePicRequest);

//Exports the router for use in other files
export default userRouter;