/* eslint-disable no-undef */
import app from './api';
import * as Config from './config';
import { logger } from './utils';

const appLogger = logger.child({ module: 'APP' });

app.listen(Config.APP_PORT, () => {
  appLogger.info(`Server is running on ${Config.APP_PORT} port`);
});

process.on('SIGINT', () => {
  appLogger.warn('SIGINT signal received: closing HTTP server');
  process.exitCode = 1;
  process.exit();
});
