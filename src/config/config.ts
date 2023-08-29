/* eslint-disable no-undef */
const DEFAULT_PORT = 3001;

export const APP_PORT = Number(process.env.PORT || DEFAULT_PORT);
export const LOG_LEVEL = process.env.LOG_LEVEL || 'info';

const DEFAULT_POSTGRES = {
  USER: 'postgres',
  PASSWORD: '12345',
  PORT: 5432,
  DATABASE_NAME: 'postgres',
  HOST: 'localhost',
};

export const JWT_SECRET = process.env.JWT_SECRET || 'secret)4';

export const POSTGRES = {
  USER: process.env.POSTGRES_USER || DEFAULT_POSTGRES.USER,
  PASSWORD: process.env.POSTGRES_PASS || DEFAULT_POSTGRES.PASSWORD,
  PORT: Number(process.env.POSTGRES_PORT) || DEFAULT_POSTGRES.PORT,
  DATABASE_NAME: process.env.POSTGRES_DB_NAME || DEFAULT_POSTGRES.DATABASE_NAME,
  HOST: process.env.POSTGRES_HOST || DEFAULT_POSTGRES.HOST,
};
