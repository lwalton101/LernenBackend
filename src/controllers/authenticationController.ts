import {Request, Response} from 'express';
import {SignupRequestModel} from "../models/SignupRequestModel";

export const testRequest = (req: Request, res: Response) => {
    res.send('This is a test');
};

export const signupRequest = (req: Request<{}, {}, SignupRequestModel>, res: Response) => {
    console.log(req.body);
    res.send(req.body);
};