import express from "express";
import {config as configDotEnv} from "dotenv";

//Loads the enviroment variables from the .env file
configDotEnv();

const app = express();

//Starts the webserver at the port provided in the .env file
app.listen(process.env.PORT, () => {
    console.log("Lernen is online!")
})
