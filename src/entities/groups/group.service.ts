import {Request, Response, NextFunction} from 'express';
import {v4 as uuid} from 'uuid';

import { Group } from './group.model';
import { HttpError, logger } from '../../utils';
import { GROUP_SCHEMA } from '../../common';
import { UserGroup } from '../relations';
import { User } from '../users/user.model';
import { Op } from 'sequelize';
import { sequelize } from '../../loaders';



export class GroupService {

    constructor(){}

    static  async getGroups(_: Request, res: Response, next: NextFunction ){
        try{
            const groups = await Group.findAll();
            res.send(groups);
            return;
        } catch(err) {
            next(err);
        }
    }

    static async  getGroupById(req: Request, res: Response, next: NextFunction ){
        try{
            const group = await Group.findOne({where: {id: req.params.id}});
            if(group == null){
                throw new HttpError(404, 'Group not found')
            }
            res.status(200).send(group);
            return;
        } catch(err) {
            next(err);
        }
    
    }

    static async  updateGroup(req: Request, res: Response, next: NextFunction ){
        try{
            
            const group = await Group.findOne({where: {id: req.params.id}});
            if(group == null){
                throw new HttpError(404, 'Group not found')
            }
            await group.update({...req.body})
            return res.status(203).send({message: 'Group has been updated'})
        } catch(err) {
            next(err)
        }
    }

    static async  deleteGroup(req: Request, res: Response, next: NextFunction ){
        try{
            const group = await Group.findOne({where: {id: req.params.id}});
            if(group == null){
                throw new HttpError(404, 'Group not found')
            }
            await group.destroy()
            return res.status(204).send({message: 'Group has been deleted'})
        } catch(err) {
            next(err)
        }
    }

    static async createGroup(req: Request, res: Response, next: NextFunction) {
        try{
            const entryGroup = req.body;
            GROUP_SCHEMA.validate(entryGroup);
            const group =  await Group.create({id: uuid(), ...entryGroup})
            res.status(201).send(group);
        } catch(err) {
            next(err);
        }
    }

    static async addUsersToGroup(req: Request, res: Response, next: NextFunction) {
        try {
            await sequelize.transaction().then( async (transaction) => {
                const {userIds, groupId} = req.body;
                if(userIds == null || groupId == null) {
                    throw new HttpError(400, 'User or Group was not specified!');
                };
                const users = await User.findAll({
                    where: { 
                        id: {
                            [Op.in]: [...userIds]
                        } 
                    }
                });
                const group = await Group.findOne({
                    where: { id: groupId }
                });
                if(users == null || group == null || users.length == 0) {
                    throw new HttpError(400, 'There is no such group or users!');
                }
                
                users.forEach(async(user) => {
                  // Will happen in parallel since `forEach` doesn't wait like `for ..of`
                  //@ts-ignore
                  await group.addUsers(user, { transaction });
                  transaction.commit();
                })
            });
            res.status(201).send({message: 'Users have been added successfully ;)'})
        } catch(error) {
            next(error);
        }
    }

}
