const bcrypt = require('bcrypt')
const pool = require('../db')

/**
 * Find user by id
 * @param {UUID} id_user Id usuario
 * @returns User
 */
const findUserById = (id_user) => {
    return pool.query(
        'SELECT * FROM users WHERE id_user = $1',
        [id_user]
    )
}

/**
 * Find user by email
 * @param {String} email 
 * @returns User
 */
const findUserByEmail = (email) => {
    return pool.query(
        'SELECT * FROM users WHERE email = $1',
        [email]
    )
}

/**
 * Create user
 * @param {String} name Name
 * @param {String} email Email
 * @param {String} password Password
 * @returns 
 */
const createUser = (name, email, password) => {
    return pool.query(
        'INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *',
        [name, email, password]
    )
}

/**
 * Crypt a password
 * @param {String} password Password to crypt
 * @returns Password crypt
 */
const cryptPassword = async (password) => {
    const salt = await bcrypt.genSalt(10)
    return await bcrypt.hash(password, salt)
}

module.exports = {
    findUserById,
    findUserByEmail,
    createUser,
    cryptPassword
}