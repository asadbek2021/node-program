import {connectPostgres, sequelize } from './postgres';
import {logger} from '../utils'
import { setRelations } from '../entities/';

export async function init() {
    try{
        logger.info('Started Connecting to DB!')
        await connectPostgres();
        await setRelations();
        await sequelize.sync({alter: true});
    } catch(err) {
        logger.error(500, err.message);

    }
}