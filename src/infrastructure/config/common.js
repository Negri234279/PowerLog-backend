import 'dotenv/config'

export const NODE_ENV = process.env.NODE_ENV
export const PORT = process.env.APP_PORT || 3000
export const DB = {
    user: process.env.PG_USER,
    password: process.env.PG_PASSWORD,
    host: process.env.PG_HOST,
    port: process.env.PG_PORT,
    database: process.env.PG_DATABASE
}
export const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY
export const JWT_NAME = 'Authorization'