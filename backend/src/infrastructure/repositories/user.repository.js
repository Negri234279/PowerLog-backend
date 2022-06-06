const { Pool } = require('pg')
const { DB } = require('../config/common')
const UserModel = require('../../domain/models/user.model')

module.exports = class UserRepository {
    static pool = new Pool(DB)

    /*constructor(pool) {
       this.pool = pool
    }*/

    /**
    * Transforms a database user into a domain user
    * @param {*} persistanceUser Database user
    * @returns Domain user
    */
    static toDomain(persistanceUser) {
        const { id_user, name, email, password } = persistanceUser.rows[0]

        return new UserModel(id_user, name, email, password)
    }

    /**
     * Transforms a domain user into a database user
     * @param {UserModel} domainUser Domain user
     * @returns Database user
     */
    static toPersistance(domainUser) {
        const { id, name, email, password } = domainUser;

        return {
            id_user: id,
            name,
            email,
            password
        }
    }

    static async findById(id) {
        const userFound = await this.pool.query(
            'SELECT * FROM users WHERE id_user = $1',
            [id]
        )

        if (!userFound.rows[0]) return null

        return UserRepository.toDomain(userFound)
    }

    static async findByEmail(email) {
        const userFound = await this.pool.query(
            'SELECT * FROM users WHERE email = $1',
            [email]
        )

        if (!userFound.rows[0]) return null

        return UserRepository.toDomain(userFound)
    }

    static async create(domainUser) {
        const { id_user, name, email, password} = UserRepository.toPersistance(domainUser)

        return await this.pool.query(
            'INSERT INTO users (id_user, name, email, password) VALUES ($1, $2, $3, $4) RETURNING *',
            [id_user, name, email, password]
        )
    }

}