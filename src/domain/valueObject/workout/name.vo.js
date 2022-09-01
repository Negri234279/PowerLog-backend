import { VOFormatException } from '../../errors/voFormat.exeption.js'
import { ValueObject } from '../valueObject.js'

const NAME_REGEX = /^[a-zA-Z ]{1,50}$/

export class VOName extends ValueObject {
    equals(valueObject) {
        return (
            valueObject instanceof VOName &&
            this.value === valueObject.value
        )
    }

    assertIsValid(value) {
        if (!NAME_REGEX.test(value)) {
            throw new VOFormatException(VOName.name, value)
        }
    }
}