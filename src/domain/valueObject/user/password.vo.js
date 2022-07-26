import { compare, hash } from 'bcrypt'
import { VOFormatException } from '../../errors/voFormat.exeption.js'
import { ValueObject } from '../valueObject.js'

// const PASSWORD_REGEX = /^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[^\w\d\s:])([^\s]){8,16}$/gm
const HASH_SALT = 10

export class VOPassword extends ValueObject {
    equals(valueObject) {
        return (
            valueObject instanceof VOPassword &&
            this.value === valueObject.value
        )
    }

    assertIsValid(_) { }

    static async create(plainPassword) {
        if (
            plainPassword.length < 8 ||
            plainPassword.length > 30 ||
            plainPassword.includes(' ')
        ) {
            throw new VOFormatException(VOPassword.name, plainPassword)
        }

        const hashedPassword = await hash(plainPassword, HASH_SALT)

        return new VOPassword(hashedPassword)
    }

    compare(voPlainPassword) {
        return compare(voPlainPassword.value, this.value)
    }
}