import * as express from 'express';

import { 
    getUsers,
    getUserById,
    updateUser,
    deleteUser,
    getSuggestedUsers
 } from './user.service';


const router = express.Router();


router.get('/', getUsers);
router.get('/:id', getUserById);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);
router.post('/suggest', getSuggestedUsers);

export default router;