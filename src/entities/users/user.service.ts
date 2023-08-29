import * as express from 'express';
import { Op } from 'sequelize';

import { User } from './user.model';
import { HttpError } from '../../utils';

export class UserService {
  static module = 'UserService';

  constructor() {}

  static async getUsers(
    _: express.Request,
    res: express.Response,
    next: express.NextFunction,
  ) {
    try {
      const users = await User.findAll();
      return res.send(users);
    } catch (error) {
      next(error);
    }
  }

  static async getUserById(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
  ) {
    try {
      const user = await User.findOne({ where: { id: req.params.id } });
      if (user == null) {
        throw new HttpError(404, { message: 'User is not found' });
      }
      res.send(user);
    } catch (error) {
      next(error);
    }
  }

  static async updateUser(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
  ) {
    try {
      const user = await User.findOne({ where: { id: req.params.id } });
      if (user == null) {
        throw new HttpError(404, { message: 'User is not found' });
      }
      await user.update({ ...req.body });
      res.status(203).send({ message: 'User has been updated' });
    } catch (error) {
      next(error);
    }
  }

  static async deleteUser(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
  ) {
    try {
      const user = await User.findOne({ where: { id: req.params.id } });
      if (user == null) {
        throw new HttpError(404, { message: 'User is not found' });
      }
      user.set({ is_deleted: true });
      await user.save();
      res.status(204).send({ message: 'User has been deleted' });
    } catch (error) {
      next(error);
    }
  }

  static async getSuggestedUsers(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
  ) {
    try {
      const { substring, limit } = req.body;
      if (limit == 0) {
        return res.status(200).send([]);
      }
      if (limit < 0) {
        throw new HttpError(400, { message: 'Limit can`t be negative' });
      }
      const filteredUsers = await User.findAll({
        limit,
        where: { login: { [Op.iLike]: `%${substring}%` } },
        order: [['login', 'ASC']],
      });
      res.status(200).send(filteredUsers);
    } catch (error) {
      next(error);
    }
  }
}
