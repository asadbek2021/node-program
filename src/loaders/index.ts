import { User } from '../users/user.model';
import {connectPostgres } from './postgres';
export {sequelize} from './postgres';

export async function init() {
    connectPostgres();
    await User.sync(); 
}