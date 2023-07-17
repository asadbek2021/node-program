import app from './api';
import * as Config from './config';
import { logger } from './utils';

const appLogger = logger.child({ module: 'APP' });

const server = app.listen(Config.APP_PORT, () => {
  appLogger.info(`Server is running on ${Config.APP_PORT} port`);
});

process.on('SIGTERM', () => {
  const log = logger.child({ module: 'App' });
  log.error('SIGTERM signal received: closing HTTP server');
  server.close(() => {
    log.info('HTTP server closed');
  });
});
