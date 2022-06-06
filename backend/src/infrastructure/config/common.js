require('dotenv').config()

module.exports = {
    NODE_ENV: process.env.NODE_ENV,
    PORT: process.env.APP_PORT || 3000,
    DB: {
        user: process.env.PG_USER,
        password: process.env.PG_PASSWORD,
        host: process.env.PG_HOST,
        port: process.env.PG_PORT,
        database: process.env.PG_DATABASE
    },
    JWT_SECRET_KEY: process.env.JWT_SECRET_KEY,
}