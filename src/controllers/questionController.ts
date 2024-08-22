import {Request, Response} from "express";

export const createQuestionRequest = (req: Request, res: Response) => {
    res.send('This is a test');
};