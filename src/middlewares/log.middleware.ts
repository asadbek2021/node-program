import Express from 'express';

import { logger } from '../utils';

export function logMiddleware({
  req,
  res,
  next,
}: {
  req: Express.Request;
  res: Express.Response;
  next: Express.NextFunction;
}) {
  let data = '';
  res.on('pipe', (src) => {
    data += src;
  });
  logger.info({
    method: res.req?.method,
    url: res.req?.url,
    reqBody: res.req?.body || null,
  });
  return next();
}
