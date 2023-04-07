import * as express from 'express';
import * as jwt from 'jsonwebtoken';
import * as Config from '../config';
import {User} from '../entities/users/user.model';
import { HttpError } from '../utils';


export async function authMiddleware(req: express.Request, res: express.Response, next: express.NextFunction){
    const token = (req.headers['authorization'] || '').replace('Bearer ', '');
    try{
        const payload = getVerifiedToken(token, Config.JWT_SECRET);
        // @ts-ignore 
        const user = await User.findOne({where:{id: payload['id']}});
        if(user == null) {
            throw new HttpError(401, {message: 'Non-authorized request'});
        }
        next();
    } catch(err){
        next(err);
    }
}

function getVerifiedToken(token: string, secret: string) {
    try{
        const decode = jwt.verify(token, secret);
        return decode;
    } catch(error) {
        throw new HttpError(403, {message: 'Invalid token'})
    }
}