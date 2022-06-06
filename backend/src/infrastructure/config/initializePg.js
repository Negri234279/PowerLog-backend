const { Pool } = require('pg')
const { DB } = require('./common')

const pool = new Pool({
    user: DB.user,
    password: DB.password,
    host: DB.host,
    port: DB.port,
    database: DB.database
})

module.exports = pool