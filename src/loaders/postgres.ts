import { Sequelize } from "sequelize";

import {config} from '../config';
import {HttpError, logger} from '../utils';


export const sequelize = new Sequelize({
    host: config.POSTGRES.HOST,
    database: config.POSTGRES.DATABASE_NAME,
    username: config.POSTGRES.USER,
    password: config.POSTGRES.PASSWORD,
    port: config.POSTGRES.PORT,
    dialect: 'postgres',
});


export async function connectPostgres() {
  try{
    await sequelize.authenticate();
    logger.info('Connected to postgres and syncronised!')
  } catch(err) {
    return new HttpError(500, err.message);
  }
}