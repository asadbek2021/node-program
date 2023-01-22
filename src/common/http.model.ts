import * as express from 'express';

import {User} from './user.model'

export type AuthorizedRequest = express.Request & {user: Pick<User, 'id' | 'login'>}
 