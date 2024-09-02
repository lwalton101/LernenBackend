import {Request, Response} from "express";
import {SearchQueryModel} from "../models/SearchQueryModel";

export const searchRequest = (req: Request<{}, {}, SearchQueryModel>, res: Response) => {
    res.send('This is a test');
};
