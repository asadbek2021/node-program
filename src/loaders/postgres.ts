import { Sequelize } from 'sequelize';
import { Logger } from 'winston';

import * as Config from '../config';
import { HttpError } from '../utils';

export const sequelize = new Sequelize({
  host: Config.POSTGRES.HOST,
  database: Config.POSTGRES.DATABASE_NAME,
  username: Config.POSTGRES.USER,
  password: Config.POSTGRES.PASSWORD,
  port: Config.POSTGRES.PORT,
  dialect: 'postgres',
  logging: false,
});

export async function connectPostgres(logger: Logger) {
  try {
    await sequelize.authenticate();
    logger.info('Connected to postgres and syncronised!');
  } catch (error) {
    return new HttpError(500, error);
  }
}
