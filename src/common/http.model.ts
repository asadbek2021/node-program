import * as express from 'express';

import {User} from '../users/user.interface'

export type AuthorizedRequest = express.Request & {user: Pick<User, 'id' | 'login'>}
 