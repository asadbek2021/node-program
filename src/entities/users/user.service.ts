import * as express from 'express';
import { Op } from 'sequelize';

import { User } from './user.model';
import { HttpError } from '../../utils';



export class UserService {

  constructor(){}

  static  async getUsers(_: express.Request, res: express.Response, next: express.NextFunction ){
        try{
            const users = await User.findAll();
            res.send(users);
            return;
        } catch(err) {
            next(err);
        }
    }

  static async  getUserById(req: express.Request, res: express.Response, next: express.NextFunction ){
        try{
            const user = await User.findOne({where: {id: req.params.id}});
            if(user == null){
                throw new HttpError(404, 'User not found')
            }
            res.status(200).send(user);
            return;
        } catch(err) {
            next(err);
        }
    
    }

  static async  updateUser(req: express.Request, res: express.Response, next: express.NextFunction ){
        try{
            
            const user = await User.findOne({where: {id: req.params.id}});
            if(user == null){
                throw new HttpError(404, 'User not found')
            }
            await user.update({...req.body})
            return res.status(203).send({message: 'User has been updated'})
        } catch(err) {
            next(err)
        }
    }

  static async  deleteUser(req: express.Request, res: express.Response, next: express.NextFunction ){
        try{
            const user = await User.findOne({where: {id: req.params.id}});
            if(user == null){
                throw new HttpError(404, 'User not found')
            }
            user.set({is_deleted: true})
            await user.save();
            return res.status(204).send({message: 'User has been deleted'})
        } catch(err) {
            next(err)
        }
    }

  static async  getSuggestedUsers(req: express.Request, res: express.Response, next: express.NextFunction ){
        try{
            const {substring, limit} = req.body;
            if(limit == 0) {
                res.status(200).send([]);
                return;
              }
            if(limit < 0){
            throw new HttpError(400, 'Limit can`t be negative');
            }
            const filteredUsers = await User.findAll({
                limit, 
                where: {login: {[Op.iLike]: `%${substring}%`}}, 
                order: [
                    ['login','ASC']
                        ]
            });
              res.status(200).send(filteredUsers);
              return;
        } catch(err) {
            next(err);
        }
    
    }

}
