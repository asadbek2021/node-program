import { Logger } from 'winston';

import { connectPostgres, sequelize } from './postgres';
import { setRelations } from '../entities';

export async function init(logger: Logger) {
  const postgresLogger = logger.child({ module: 'Postgres' });
  try {
    postgresLogger.info('Started Connecting to DB!');
    await connectPostgres(postgresLogger);
    await setRelations();
    await sequelize.sync({ alter: true });
  } catch (error) {
    postgresLogger.error(error);
  }
}
