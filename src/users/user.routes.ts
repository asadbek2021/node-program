import * as express from 'express';

import {UserService} from './user.service';


const router = express.Router();


router.get('/', UserService.getUsers);
router.get('/:id', UserService.getUserById);
router.put('/:id', UserService.updateUser);
router.delete('/:id', UserService.deleteUser);
router.post('/suggest', UserService.getSuggestedUsers);

export default router;