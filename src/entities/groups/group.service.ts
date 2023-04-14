import {Request, Response, NextFunction} from 'express';
import {v4 as uuid, validate} from 'uuid';
import { Op } from 'sequelize';

import { Group } from './group.model';
import { HttpError } from '../../utils';
import { GROUP_SCHEMA } from '../../common';
import { User } from '../users/user.model';
import { sequelize } from '../../loaders';



export class GroupService {

    private static module = 'GroupService';

    constructor(){}

    static async getGroups(_: Request, res: Response, next: NextFunction ){
        try{
            const groups = await Group.findAll();
            return res.send(groups);
        } catch(error) {
            const newErr = {...error, module: this.module, method: 'getGroups'}
            next(newErr);
        }
    }

    static async getGroupById(req: Request, res: Response, next: NextFunction ){
        try{
            const group = await Group.findOne({where: {id: req.params.id}});
            if(group == null){
                throw new HttpError(404, {message:'Group is not found'})
            }
            res.send(group);
            return;
        } catch(error) {
            const newErr = {...error, module: this.module, method: 'getGroupById'}
            next(newErr);
        }
    
    }

    static async updateGroup(req: Request, res: Response, next: NextFunction ){
        try{
            const group = await Group.findOne({where: {id: req.params.id}});
            if(group == null){
                throw new HttpError(404, {message: 'Group is not found'})
            }
            await group.update({...req.body})
            return res.status(203).send({message: 'Group has been updated'})
        } catch(error) {
            const newErr = {...error, module: this.module, method: 'updateGroup'}
            next(newErr);
        }
    }

    static async  deleteGroup(req: Request, res: Response, next: NextFunction ){
        try{
            const group = await Group.findOne({where: {id: req.params.id}});
            if(group == null){
                throw new HttpError(404, {message: 'Group is not found'})
            }
            await group.destroy()
            return res.status(204).send({message: 'Group has been deleted'})
        } catch(error) {
            const newErr = {...error, module: this.module, method: 'deleteGroup'}
            next(newErr);
        }
    }

    static async createGroup(req: Request, res: Response, next: NextFunction) {
        try{
            const entryGroup = req.body;
            GROUP_SCHEMA.validate(entryGroup);
            const group =  await Group.create({id: uuid(), ...entryGroup})
            res.status(201).send(group);
        } catch(error) {
            const newErr = {...error, module: this.module, method: 'createGroup'}
            next(newErr);
        }
    }

    static async addUsersToGroup(req: Request, res: Response, next: NextFunction) {
        try {
            await sequelize.transaction().then( async (transaction) => {
                const {userIds, groupId} = req.body;
                if(userIds == null || groupId == null || userIds?.length == 0) {
                    throw new HttpError(400, {message: 'User or Group was not specified!'});
                };
                userIds.forEach((userId: string) => {
                    if(!validate(userId)) {
                        throw new HttpError(400, {message: 'Invalid user id!', userId});
                    }
                })
                if(!validate(groupId)){
                    throw new HttpError(400, {message: 'Invalid group id!', groupId}); 
                }
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
                    throw new HttpError(400, {message: 'There is no such group or users!'});
                }
                
                users.forEach(async(user) => {
                  //@ts-ignore
                  await group.addUsers(user, { transaction });
                  transaction.commit();
                })
            });
            res.status(201).send({message: 'Users have been added successfully ;)'})
        } catch(error) {
            const newErr = {...error, module: this.module, method: 'addUsersToGroup'}
            next(newErr);
        }
    }

}
