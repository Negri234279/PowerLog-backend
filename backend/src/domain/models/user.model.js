const { hash } = require("bcrypt")
const { test: uuidTest } = require('uuid-random')
const InvalidEmailFormatException = require('../errors/invalidEmailFormat.exception')
const InvalidIdFormatException= require('../errors/invalidIdFormat.exception')
const InvalidNameFormatException = require('../errors/invalidNameFormat.exception')
const InvalidPasswordFormatException = require('../errors/invalidPasswordFormat.exception')

const HASH_SALT = 10;

/**
 * Registered user in the application
 */
class UserModel {
    /**
     * @param {String} id User identifier
     * @param {String} name User name and surname
     * @param {String} email User email
     * @param {String} password User hashed password
     */
    constructor(id, name, email, password) {
        this.id = id
        this.name = name
        this.email = email
        this.password = password
    }

    static validateId(id) {
        return uuidTest(id)
    }

    static validateName(name) {
        const nameRegex = /^(?![\s-])(?!.*[\s-]{2})(?!.*[\s-]$)[A-Z\s-]{2,30}$/i

        return nameRegex.test(name);
    }

    static validateEmail(email) {
        const emailRegex =
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

        return emailRegex.test(email)
    }

    static validatePassword(password) {
        return (
            password.length >= 4 &&
            password.length <= 30 &&
            !password.includes(' ')
        )
    }

    static async createLogin(email, password) {
        if (!UserModel.validateEmail(email))
            throw new InvalidEmailFormatException()

        if (!UserModel.validatePassword(password))
            throw new InvalidPasswordFormatException()

        return new UserModel(null, null, email, password)
    }

    static async createRegister(id, name, email, password) {
        if (!UserModel.validateId(id))
            throw new InvalidIdFormatException()
        
        if (!UserModel.validateName(name))
            throw new InvalidNameFormatException()
        
        if (!UserModel.validateEmail(email))
            throw new InvalidEmailFormatException()
        
        if (!UserModel.validatePassword(password))
            throw new InvalidPasswordFormatException()        

        const hashedPassword = await hash(password, HASH_SALT)

        return new UserModel(id, name, email, hashedPassword)
    }

    static async profile(id) {
        if (!UserModel.validateId(id))
            throw new InvalidIdFormatException()

        return new UserModel(id, null, null, null)
    }
    
}

module.exports = UserModel