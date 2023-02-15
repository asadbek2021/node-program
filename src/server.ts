import app from './api';
import { config } from './config/config'
import { logger } from './utils';

const server = app.listen(config.PORT, ()=> {
    console.log(`Server is running on ${config.PORT} port`)
},)


process.on('SIGTERM', () => {
    logger.info('SIGTERM signal received: closing HTTP server')
    server.close(() => {
        logger.info('HTTP server closed')
    })
  })