import { VOFormatException } from '../../errors/voFormat.exeption.js'
import { ValueObject } from '../valueObject.js'

export class VOPlainPassword extends ValueObject {
    equals(valueObject) {
        return this.value === valueObject.value
    }

    assertIsValid(value) {
        if (value.length < 8 && value.length > 30 && value.includes(' '))
            throw new VOFormatException(VOPlainPassword.name, value)
    }
}