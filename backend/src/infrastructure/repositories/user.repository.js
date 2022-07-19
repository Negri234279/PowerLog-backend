import { UserModel } from '../../domain/models/user.model.js'
import { VOUuid } from '../../domain/valueObject/shared/uuid.vo.js'
import { VOEmail } from '../../domain/valueObject/user/email.vo.js'
import { VOName } from '../../domain/valueObject/user/name.vo.js'
import { VOPassword } from '../../domain/valueObject/user/password.vo.js'

export class UserRepository {
    constructor({ pool }) {
       this.pool = pool
    }

    /**
    * Transforms a database user into a domain user
    * @param {*} persistanceUser Database user
    * @returns Domain user
    */
    toDomain(persistanceUser) {
        const { id_user, name, email, password } = persistanceUser.rows[0]

        return new UserModel(
            new VOUuid(id_user),
            new VOName(name),
            new VOEmail(email),
            new VOPassword(password)
        )
    }

    /**
     * Transforms a domain user into a database user
     * @param {UserModel} domainUser Domain user
     * @returns Database user
     */
    toPersistance(domainUser) {
        const { id, name, email, password } = domainUser;

        return {
            id_user: id,
            name,
            email,
            password
        }
    }

    async findById(id) {
        const userFound = await this.pool.query(
            'SELECT * FROM users WHERE id_user = $1',
            [id._value]
        )

        if (!userFound.rows[0]) return null

        return this.toDomain(userFound)
    }

    async findByEmail(email) {
        const userFound = await this.pool.query(
            'SELECT * FROM users WHERE email = $1',
            [email._value]
        )

        if (!userFound.rows[0]) return null

        return this.toDomain(userFound)
    }

    async create(domainUser) {
        const { id_user, name, email, password } = this.toPersistance(domainUser)

        return await this.pool.query(
            'INSERT INTO users (id_user, name, email, password) VALUES ($1, $2, $3, $4) RETURNING *',
            [id_user._value, name._value, email._value, password._value]
        )
    }

}