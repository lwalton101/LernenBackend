import {Request, Response} from 'express';
import {SignupRequestModel} from "../models/SignupRequestModel";

export const testRequest = (req: Request, res: Response) => {
    res.send('This is a test');
};

export const signupRequest = (req: Request<{}, {}, SignupRequestModel>, res: Response) => {

    if (!req.body.username) {
        res.status(400);
        res.send({message: "Please include a username"})
        return;
    }

    if (!req.body.password) {
        res.status(400);
        res.send({message: "Please include a password"})
        return;
    }
    //3 to 16 characters long and contain only letters, digits, underscores, and hyphens
    if (!req.body.username.match(/^[a-zA-Z0-9_-]{3,16}$/)) {
        res.status(400);
        res.send({message: "Invalid Username/Password"})
        return;
    }
    //1 number (0-9),1 uppercase letter,1 lowercase letters,1 non-alpha numeric number,8-16 characters with no space
    if (!req.body.password.match(/^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[^\w\d\s:])([^\s]){8,16}$/)) {
        res.status(400);
        res.send({message: "Invalid Username/Password"})
        return;
    }
    res.send(req.body);
};