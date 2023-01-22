import * as express from 'express';
import { HttpError } from '../utils';


export function auth (req: express.Request, res: express.Response, next: express.NextFunction){
    if(req.app.get('login') == null){
        throw new HttpError(401, 'Not authorized request')
    }
    next();
}