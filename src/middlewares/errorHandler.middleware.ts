import * as express from 'express';
import * as joi from 'joi';

import { HttpError, logger } from '../utils';

export function errorMiddleware(
  error: Error | HttpError,
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) {
  process.on('uncaughtException', (err: Error) => {
    logger.error(err);
    res.status(500).send({ message: 'Internal server error' });
    process.exit(1);
  });
  process.on('unhandledRejection', (err: Error) => {
    logger.error(err);
    res.status(500).send({ message: 'Internal server error' });
    process.exit(1);
  });

  if (error instanceof HttpError) {
    logger.error(error);
    res.status(error?.statusCode).send({ message: error.message });
    return;
  }
  if (error instanceof joi.ValidationError) {
    logger.error(error);
    res.status(400).send({ message: error.message, details: error.details });
    return;
  }
  logger.error(error);
  res.status(500).send({ message: error.message });
  return;
}
