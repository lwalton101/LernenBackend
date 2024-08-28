import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import {config as configDotEnv} from "dotenv";
import authRouter from "./routes/authenticationRouter";
import logRequestMiddleware from "./middleware/loggerMiddleware";
import {initDatabase} from "./db";
import userRouter from "./routes/userRoutes";
import questionRouter from "./routes/questionRoutes";
import resultRouter from "./routes/resultRouter";

//Loads the enviroment variables from the .env file
configDotEnv();

initDatabase();
//Starts the webserver at the port provided in the .env file
const app = express();
app.listen(process.env.PORT, () => {
    console.log(`Lernen is online at http://localhost:${process.env.PORT}!`)
})
//Middleware Section
//This allows cross site requests, for example between the front and backend
app.use(cors());
//This means any data sent in a HTTP request body will be automatically parsed into a JSON object
app.use(bodyParser.json());

//Routes
app.use("/auth", authRouter);
app.use("/user", userRouter);
app.use("/result", resultRouter);
app.use("/question", questionRouter);

app.use(logRequestMiddleware)

