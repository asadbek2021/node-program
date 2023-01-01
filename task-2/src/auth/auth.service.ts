import * as express from 'express';
import {v4 as uuid} from 'uuid';

import { HttpError } from '../utils';
import { USER_SCHEMA, User, users } from '../common';


export function login(req: express.Request, res: express.Response, next: express.NextFunction ){
    try{
        const user = users.find(user => user.login === req.body.login);
        if(user == null || user.password !== req.body.password){
            throw new HttpError(400, 'Login or password invalid')
        }
        req.app.set('login', user.login);
        req.app.set('id', user.id);
        res.status(200).send({message: 'Logged in successfully!'});
        return;
    } catch(err) {
        next(err);
    }

}

export function register(req: express.Request, res: express.Response, next: express.NextFunction ){
    try{
        const user = users.find(user => user.login === req.body.login);
        if(user != null){
            throw new HttpError(400, 'User already exists')
        }

        const newUser = {...req.body, id: uuid(), isDeleted: false};
       const {error} = USER_SCHEMA.validate(newUser);
       if(error){
        throw error;
       }
        users.push(newUser);
        res.status(201).send({message: 'User has been created'});
     return;
    } catch(err) {
        next(err);
    }

}

