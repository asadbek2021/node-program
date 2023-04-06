import * as express from 'express';
import * as jwt from 'jsonwebtoken';
import * as Config from '../config';
import { HttpError } from '../utils';


export function authMiddleware(req: express.Request, res: express.Response, next: express.NextFunction){
    try{
        getVerifiedToken(req.headers['authorization'] || '', Config.JWT_SECRET);
    } catch(err){
        next(err);
    }
    next();
}

function getVerifiedToken(token: string, secret: string) {
    try{
        const decode = jwt.verify(token, secret);
        return decode;
    } catch(error) {
        throw new HttpError(401, {message: 'Non-authorized request'})
    }
}