import * as dotenv from 'dotenv';

const DEFAULT_PORT = 3001;
dotenv.config();

export const config = {
    PORT: process.env.PORT || DEFAULT_PORT, 
}