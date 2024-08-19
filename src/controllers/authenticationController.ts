import {Request, Response} from 'express';
import {SignupRequestModel} from "../models/SignupRequestModel";
import {hashPassword} from "../../hash";
import {User} from "../models/db/User";
import {createUser, getUserByEmail} from "../../db/user";

export const testRequest = (req: Request, res: Response) => {
    res.send('This is a test');
};

export const signupRequest = async (req: Request<{}, {}, SignupRequestModel>, res: Response) => {

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

    if (!req.body.email) {
        res.status(400);
        res.send({message: "Please include an email"})
        return;
    }
    // Regular expression to validate usernames with 3-16 characters, allowing letters, digits, underscores, and hyphens.
    const usernameMatcher = /^[a-zA-Z0-9_-]{3,16}$/
    if (!usernameMatcher.test(req.body.username)) {
        res.status(400).send({message: "Invalid Username"})
        return;
    }
    // Regular expression to validate passwords with at least one lowercase, one uppercase, one digit, one special character, and a minimum length of 8 characters.
    const passwordMatcher = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/;
    if (!passwordMatcher.test(req.body.password)) {
        res.status(400).send({message: "Invalid Password"});
        return;
    }

    const emailMatcher = /^((?!\.)[\w\-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/
    if (!emailMatcher.test(req.body.email)) {
        res.status(400).send({message: "Invalid Email"});
        return;
    }

    //Hash password
    const hashedPassword = await hashPassword(req.body.password);

    const newUser: User = {
        username: req.body.username,
        password: hashedPassword,
        email: req.body.email
    }
    var existingUser = await getUserByEmail(req.body.email);
    if (existingUser) {
        res.status(400).send({message: "User already exists"});
        return;
    }

    await createUser(newUser);
    res.status(200).send("Successful!");
};