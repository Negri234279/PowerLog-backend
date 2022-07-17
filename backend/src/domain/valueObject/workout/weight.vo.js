import { VOFormatException } from '../../errors/voFormat.exeption.js'
import { ValueObject } from '../valueObject.js'

const WEIGHT_REGEX = /^[0-9]{1,4}$/

export class VOWeight extends ValueObject {
    equals(valueObject) {
        return (
            valueObject instanceof VOWeight &&
            this.value === valueObject.value
        )
    }

    assertIsValid(value) {
        if (!WEIGHT_REGEX.test(value)) {
            throw new VOFormatException(VOWeight.name, value)
        }
    }
}