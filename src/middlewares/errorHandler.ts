import * as express from 'express';
import * as joi from 'joi'; 

import { HttpError, logger } from '../utils';

export function errorHandler(err: Error | HttpError,req: express.Request, res: express.Response, next: express.NextFunction) {
    if( err instanceof HttpError){
        logger.error(err.statusCode, err.message);
        res.status(err.statusCode).send({message: err.message});
        return;
    }
    if(err instanceof joi.ValidationError){
        logger.error(400, err.message);
        res.status(400).send({message: err.message});
        return;
    }
    logger.error(500, err.message);
    return;
}