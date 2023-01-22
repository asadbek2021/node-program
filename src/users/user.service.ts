import * as express from 'express';
import {v4 as uuid} from 'uuid';

import {USER_SCHEMA, User, users} from '../common';
import { HttpError } from '../utils';



export function getUsers(_: express.Request, res: express.Response, next: express.NextFunction ){
    try{
        res.send(users);
        return;
    } catch(err) {
        next(err);
    }
}

export function getUserById(req: express.Request, res: express.Response, next: express.NextFunction ){
    try{
        const user = users.find(user => user.id === req.params.id);
        if(user == null){
            throw new HttpError(404, 'User not found')
        }
     res.status(200).send(user);
     return;
    } catch(err) {
        next(err);
    }

}

export function updateUser(req: express.Request, res: express.Response, next: express.NextFunction ){
    try{
        const user = users.find(user => user.id === req.params.id);
        if(user == null){
            throw new HttpError(404, 'User not found')
        }
        const index = users.findIndex(person => person.id === user.id);
        const updatedUser = {...user, ...req.body, id: user.id};
        const {error} = USER_SCHEMA.validate(updatedUser);
        if(error){
            throw error;
        }
        users[index] = updatedUser;
        return res.status(203).send({message: 'User has been updated'})
    } catch(err) {
        next(err)
    }
}
export function deleteUser(req: express.Request, res: express.Response, next: express.NextFunction ){
    try{
        const user = users.find(user => user.id === req.params.id);
        if(user == null){
            throw new HttpError(404, 'User not found')
        }
        const index = users.findIndex(person => person.id === user.id);
        users[index] = {...user, isDeleted: true};
        return res.status(204).send({message: 'User has been deleted'})
    } catch(err) {
        next(err)
    }
}
export function getSuggestedUsers(req: express.Request, res: express.Response, next: express.NextFunction ){
    try{
        const {substring, limit} = req.body;
        const filteredUsers = users.filter(user => user.login.match(substring) != null);
        if(filteredUsers.length > 0 && limit >= 0) {
          const result = filteredUsers.sort((a, b)=> (a.login > b.login ? 1 : -1));

          if(result.length > limit && limit !== 0){
            res.status(200).send(filteredUsers.slice(0,limit));
            return;
          }
          res.status(200).send(filteredUsers);
          return;
        }
        throw new HttpError(400, 'Limit can`t be negative');
    } catch(err) {
        next(err);
    }

}
