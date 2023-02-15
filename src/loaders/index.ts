import { User } from '../entities/users/user.model';
import {connectPostgres } from './postgres';
export {sequelize} from './postgres';
import {logger} from '../utils'

export async function init() {
    try{
       await connectPostgres();
        await User.sync(); 
    } catch(err) {
        logger.error(500, err.message);

    }
}