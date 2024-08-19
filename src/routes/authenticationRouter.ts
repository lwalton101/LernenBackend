import Router from "express";
import {loginRequest, signupRequest, testRequest} from "../controllers/authenticationController";

//Creates a new router
const authRouter = Router();

authRouter.get("/test", testRequest)
authRouter.post("/signup", signupRequest)
authRouter.post("/login", loginRequest)

//Exports the router for use in other files
export default authRouter;