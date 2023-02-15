import * as express from 'express';

import {GroupService} from './group.service';


const router = express.Router();


router.get('/', GroupService.getGroups);
router.get('/:id', GroupService.getGroupById);
router.put('/:id', GroupService.updateGroup);
router.delete('/:id', GroupService.deleteGroup);
router.post('/', GroupService.createGroup);

export default router;