import Router from "express";
import {loginRequest, signupRequest, testProtectedRequest, testRequest} from "../controllers/authenticationController";
import {authMiddleware} from "../middleware/authMiddleware";

//Creates a new router
const authRouter = Router();

authRouter.get("/test", testRequest)
authRouter.get("/testProtected", authMiddleware, testProtectedRequest)
authRouter.post("/signup", signupRequest)
authRouter.post("/login", loginRequest)

//Exports the router for use in other files
export default authRouter;