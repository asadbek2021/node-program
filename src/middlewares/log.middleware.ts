import Express from 'express';

import { logger } from '../utils';

export function logMiddleware({
  res,
  next,
}: {
  res: Express.Response;
  next: Express.NextFunction;
}) {
  logger.info({
    method: res.req?.method,
    url: res.req?.url,
    reqBody: res.req?.body || null,
  });
  return next();
}
