import Router from "express";
import {signupRequest, testRequest} from "../controllers/authenticationController";

//Creates a new router
const authRouter = Router();

authRouter.get("/test", testRequest)
authRouter.post("/signup", signupRequest)

//Exports the router for use in other files
export default authRouter;