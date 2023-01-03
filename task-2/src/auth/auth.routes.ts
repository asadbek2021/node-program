import * as express from 'express';
import { login, register } from './auth.service';


const router = express.Router();


router.post('/login', login);
router.post('/register', register);

export default router;