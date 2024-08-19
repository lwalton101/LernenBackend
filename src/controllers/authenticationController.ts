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
    // Regular expression to validate usernames with 3-16 characters, allowing letters, digits, underscores, and hyphens.
    const usernameMatcher = /^[a-zA-Z0-9_-]{3,16}$/
    if (usernameMatcher.test(req.body.username)) {
        res.status(400).send({message: "Invalid Username/Password"})
        return;
    }
    // Regular expression to validate passwords with at least one lowercase, one uppercase, one digit, one special character, and a minimum length of 8 characters.
    const passwordMatcher = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/;
    if (!passwordMatcher.test(req.body.password)) {
        res.status(400).send({message: "Invalid Username/Password"});
        return;
    }
    res.send(req.body);
};