import express from 'express';

import { UserRouter, GroupRouter } from './entities';
import { AuthRouter } from './auth';
import { authMiddleware, errorMiddleware, logMiddleware } from './middlewares';
import { logger } from './utils';
import * as Loaders from './loaders';

const app = express();

Loaders.init(logger);

app.use(express.json());

app.use(logMiddleware);
app.use('/api/auth', AuthRouter);

app.use(authMiddleware);

// all protected pages
app.use('/api/user', UserRouter);
app.use('/api/group', GroupRouter);

// the last catches all errors
app.use(errorMiddleware);

export default app;
