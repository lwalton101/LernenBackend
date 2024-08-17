import {NextFunction, Request, Response} from 'express';

const logRequestMiddleware = (req: Request, res: Response, next: NextFunction): void => {
    const time = new Date(Date.now()).toString();
    console.log(req.method, req.hostname, req.path, time);
    next();
};

export default logRequestMiddleware;