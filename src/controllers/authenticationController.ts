import {Request, Response} from 'express';

export const testRequest = (req: Request, res: Response) => {
    res.send('This is a test');
};