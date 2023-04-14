
const DEFAULT_PORT = 3001;

const DEF_POSTGRES = {
    USER: 'postgres',
    PASSWORD: '',
    PORT: 5432,
    DATABASE_NAME: 'postgres',
    HOST: 'localhost'
}

const POSTGRES = {
    USER: process.env.POSTGRES_USER || DEF_POSTGRES.USER,   
    PASSWORD: process.env.POSTGRES_PASS || DEF_POSTGRES.PASSWORD,
    PORT: Number(process.env.POSTGRES_PORT) || DEF_POSTGRES.PORT,
    DATABASE_NAME: process.env.POSTGRES_DB_NAME || DEF_POSTGRES.DATABASE_NAME,
    HOST: process.env.POSTGRES_HOST || DEF_POSTGRES.HOST
}

export const config = {
    PORT: process.env.PORT || DEFAULT_PORT, 
    POSTGRES
}