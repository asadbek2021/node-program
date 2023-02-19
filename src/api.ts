import * as express from 'express';

import { UserRouter, GroupRouter } from './entities'
import { AuthRouter } from './auth'
import { auth, errorHandler } from './middlewares';
import * as Loaders from './loaders';

const app = express();

Loaders.init();

app.use(express.json());

app.use('/api/auth', AuthRouter);

app.use(auth);
// all protected pages
app.use('/api/user', UserRouter);
app.use('/api/group', GroupRouter);
// the last catches all errors
app.use(errorHandler);


export default app;