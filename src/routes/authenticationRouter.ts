import Router from "express";
import {testRequest} from "../controllers/authenticationController";

//Creates a new router
const authRouter = Router();

authRouter.get("/test", testRequest)

//Exports the router for use in other files
export default authRouter;