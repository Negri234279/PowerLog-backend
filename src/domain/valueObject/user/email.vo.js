import { VOFormatException } from '../../errors/voFormat.exeption.js'
import { ValueObject } from '../valueObject.js'

const EMAIL_REGEX = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

export class VOEmail extends ValueObject {
    equals(valueObject) {
        return (
            valueObject instanceof VOEmail &&
            this.value === valueObject.value
        )
    }

    assertIsValid(value) {
        if (!EMAIL_REGEX.test(value)) {
            throw new VOFormatException(VOEmail.name, value)
        }
    }
}