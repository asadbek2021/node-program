import * as express from 'express';

import { UserRouter } from './users'
import { AuthRouter } from './auth'
import { auth, errorHandler } from './middlewares';

const app = express();


app.use(express.json());

app.use('/api/auth', AuthRouter);

app.use(auth);
// all protected pages
app.use('/api/user', UserRouter);
// the last catches all errors
app.use(errorHandler);


export default app;