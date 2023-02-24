import * as express from 'express';
import {v4 as uuid} from 'uuid';

import { User } from '../entities/users/user.model';
import { HttpError } from '../utils';


export async function login(req: express.Request, res: express.Response, next: express.NextFunction ){
    try{
        const user = await User.findOne({where:{ login: req.body.login, password: req.body.password }});
        if(user == null){
            throw new HttpError(400, {message: 'Login or password invalid'})
        }
        req.app.set('login', user.dataValues.login);
        req.app.set('id', user.dataValues.id);
        res.status(200).send({message: 'Logged in successfully!'});
        return;
    } catch(error) {
        const newError = {...error, module: 'AUTH', method: 'login'}
        next(newError);
    }

}

export async function register(req: express.Request, res: express.Response, next: express.NextFunction ){
    try{
        const user = await User.findOne({where: {login: req.body.login}});
        if(user != null){
            throw new HttpError(400, {message: 'User already exists'})
        }
        const newUser =  await User.create({id: uuid(), ...req.body })
        res.status(201).send(newUser);
     return;
    } catch(error) {
        const newError = {...error, module: 'AUTH', method: 'login'}
        next(newError);
    }

}

