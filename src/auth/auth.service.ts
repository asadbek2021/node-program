import * as express from 'express';
import * as jwt from 'jsonwebtoken';
import { v4 as uuid } from 'uuid';
import * as Config from '../config';

import { User } from '../entities/users/user.model';
import { HttpError } from '../utils';

export async function login(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) {
  try {
    const user = await User.findOne({
      where: { login: req.body.login, password: req.body.password },
    });
    if (user == null) {
      throw new HttpError(400, { message: 'Login or password invalid' });
    }
    // @ts-ignore
    const token = generateToken({ id: user.id }, Config.JWT_SECRET);
    res.status(200).send({ message: 'Logged in successfully!', token });
    return;
  } catch (error) {
    next(error);
  }
}

export async function register(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) {
  try {
    const user = await User.findOne({ where: { login: req.body.login } });
    if (user != null) {
      throw new HttpError(400, { message: 'User already exists' });
    }
    const newUser = await User.create({ id: uuid(), ...req.body });
    res.status(201).send(newUser);
    return;
  } catch (error) {
    next(error);
  }
}

function generateToken(payload: any, secret: string) {
  const token = jwt.sign(payload, secret, { expiresIn: '2h' });
  return token;
}
