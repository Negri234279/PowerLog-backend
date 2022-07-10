import { InvalidUserFormatException } from '../errors/invalidUserFormat.exeption.js'
import { VOUuid } from '../valueObject/shared/uuid.vo.js'
import { VOEmail } from '../valueObject/user/email.vo.js'
import { VOName } from '../valueObject/user/name.vo.js'
import { VOPassword } from '../valueObject/user/password.vo.js'

/**
 * Registered user in the application
 */
export class UserModel {
    /**
     * @param {String} id User identifier
     * @param {String} name User name and surname
     * @param {String} email User email
     * @param {String} password User hashed password
     */
    constructor(id, name, email, password) {
        this.assertIsValid(id, name, email, password)

        this.id = id
        this.name = name
        this.email = email
        this.password = password
    }

    assertIsValid(id, name, email, password) {
        if (
            !(id instanceof VOUuid) ||
            !(name instanceof VOName) ||
            !(email instanceof VOEmail) ||
            !(password instanceof VOPassword)
        )
            throw new InvalidUserFormatException()
    }
    
}